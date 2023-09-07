package com.unibuc.fmi.review_everything.service;


import com.unibuc.fmi.review_everything.dto.friendrequest.request.FriendRequestDto;
import com.unibuc.fmi.review_everything.dto.friendrequest.request.FriendRequestStatusDto;
import com.unibuc.fmi.review_everything.dto.friendrequest.response.FriendResponseDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import com.unibuc.fmi.review_everything.exception.friendrequest.FriendNotFoundException;
import com.unibuc.fmi.review_everything.exception.friendrequest.FriendRequestAlreadyExistsException;
import com.unibuc.fmi.review_everything.exception.friendrequest.FriendRequestBadRequestException;
import com.unibuc.fmi.review_everything.exception.friendrequest.FriendRequestNotFoundException;
import com.unibuc.fmi.review_everything.exception.movie.MovieNotFoundException;
import com.unibuc.fmi.review_everything.exception.user.UserNotFoundException;
import com.unibuc.fmi.review_everything.model.FriendRequest;
import com.unibuc.fmi.review_everything.enums.Status;
import com.unibuc.fmi.review_everything.model.User;
import com.unibuc.fmi.review_everything.repository.FriendRequestRepository;
import com.unibuc.fmi.review_everything.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class FriendRequestService {
    private final UserRepository userRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;

    public void sendFriendRequest(FriendRequestDto friendRequestDto) {
        var sender = userRepository.findById(friendRequestDto.getSenderId()).orElseThrow(UserNotFoundException::new);
        var receiver = userRepository.findById(friendRequestDto.getReceiverId()).orElseThrow(UserNotFoundException::new);

        if (friendRequestDto.getSenderId().equals(friendRequestDto.getReceiverId())) {
            throw new FriendRequestBadRequestException();
        }

        List<FriendRequest> existingWaitingRequests1 = friendRequestRepository.findBySenderAndReceiverAndStatus(sender, receiver, Status.WAITING);
        List<FriendRequest> existingAcceptedRequests1 = friendRequestRepository.findBySenderAndReceiverAndStatus(sender, receiver, Status.ACCEPTED);
        List<FriendRequest> existingWaitingRequests2 = friendRequestRepository.findBySenderAndReceiverAndStatus(receiver, sender, Status.WAITING);
        List<FriendRequest> existingAcceptedRequests2 = friendRequestRepository.findBySenderAndReceiverAndStatus(receiver, sender, Status.ACCEPTED);
        if (!existingWaitingRequests1.isEmpty() || !existingAcceptedRequests1.isEmpty() || !existingWaitingRequests2.isEmpty() || !existingAcceptedRequests2.isEmpty()) {
            throw new FriendRequestAlreadyExistsException();
        }

        var friendRequest = new FriendRequest(null, sender, receiver, Status.WAITING);
        friendRequestRepository.save(friendRequest);
    }

    public List<FriendResponseDto> getFriendRequests(Long receiverId) {
        var receiver = userRepository.findById(receiverId).orElseThrow();
        var requests = friendRequestRepository.findByReceiverAndStatus(receiver, Status.WAITING);
        //return requests;
        List<FriendResponseDto> friendResponseDtos = new ArrayList<>();
        for (FriendRequest request : requests) {
            var sender = request.getSender();
            friendResponseDtos.add(new FriendResponseDto(
                    request.getId(),
                    request.getStatus(),
                    request.getSender().getId(),
                    request.getSender().getUsername()
            ));
        }
        return friendResponseDtos;
    }

    public FriendRequestDto handleFriendRequest(Long requestId, FriendRequestStatusDto friendRequestStatusDto) {
        FriendRequest request = friendRequestRepository.findById(requestId).orElseThrow(FriendRequestNotFoundException::new);
        request.setStatus(Status.valueOf(friendRequestStatusDto.getStatus().name()));
        friendRequestRepository.save(request);
        return modelMapper.map(request, FriendRequestDto.class);
    }

    public List<UserResponseDto> getFriends(Long userId) {
        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        List<User> friends = new ArrayList<>();

        var sentRequests = friendRequestRepository.findBySenderAndStatus(user, Status.ACCEPTED);
        for (FriendRequest request : sentRequests) {
            if (!Objects.equals(request.getReceiver().getId(), userId) && !this.checkFriendIsAlreadyInList(friends, request.getReceiver())) {
                friends.add(request.getReceiver());
            }
        }

        var receivedRequests = friendRequestRepository.findByReceiverAndStatus(user, Status.ACCEPTED);
        for (FriendRequest request : receivedRequests) {
            if (!Objects.equals(request.getSender().getId(), userId) && !this.checkFriendIsAlreadyInList(friends, request.getSender())) {
                friends.add(request.getSender());
            }
        }

        var listType = new TypeToken<List<UserResponseDto>>() {}.getType();
        return modelMapper.map(friends, listType);
    }

    private boolean checkFriendIsAlreadyInList(List<User> friendRequests, User friend) {
        List<Long> friendRequestIds = friendRequests.stream().map(User::getId).toList();

        return friendRequestIds.contains(friend.getId());
    }

    public void deleteFriendRequest(Long requestId) {
        var friendRequest = friendRequestRepository.findById(requestId).orElseThrow(FriendRequestNotFoundException::new);
        if(friendRequest.getStatus() == Status.WAITING) {
            friendRequestRepository.delete(friendRequest);
        }
        else throw new FriendRequestNotFoundException();
    }

    public void deleteFriend(Long userId) {
        var friendRequestDto = new FriendRequestDto(userService.getCurrentUser().getId(), userId);
        var sender = userRepository.findById(friendRequestDto.getSenderId()).orElseThrow(UserNotFoundException::new);
        var receiver = userRepository.findById(friendRequestDto.getReceiverId()).orElseThrow(UserNotFoundException::new);
        List<FriendRequest> existingAcceptedRequests1 = friendRequestRepository.findBySenderAndReceiverAndStatus(sender, receiver, Status.ACCEPTED);
        List<FriendRequest> existingAcceptedRequests2 = friendRequestRepository.findBySenderAndReceiverAndStatus(receiver, sender, Status.ACCEPTED);

        if (!existingAcceptedRequests1.isEmpty() || !existingAcceptedRequests2.isEmpty()) {
            friendRequestRepository.deleteAll(existingAcceptedRequests1);
            friendRequestRepository.deleteAll(existingAcceptedRequests2);
        }
        else throw new FriendNotFoundException();
    }
}


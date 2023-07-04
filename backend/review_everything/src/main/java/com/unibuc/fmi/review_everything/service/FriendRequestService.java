package com.unibuc.fmi.review_everything.service;


import com.unibuc.fmi.review_everything.dto.friendrequest.request.FriendRequestDto;
import com.unibuc.fmi.review_everything.dto.friendrequest.request.FriendRequestStatusDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
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

    public void sendFriendRequest(FriendRequestDto friendRequestDto) {
        var sender = userRepository.findById(friendRequestDto.getSenderId()).orElseThrow();
        var receiver = userRepository.findById(friendRequestDto.getReceiverId()).orElseThrow();
        var friendRequest = new FriendRequest(null, sender, receiver, Status.WAITING);
        friendRequestRepository.save(friendRequest);
    }

    public List<FriendRequest> getFriendRequests(Long receiverId) {
        var receiver = userRepository.findById(receiverId).orElseThrow();
        var requests = friendRequestRepository.findByReceiverAndStatus(receiver, Status.WAITING);
        return requests;
    }

    public FriendRequestDto handleFriendRequest(Long requestId, FriendRequestStatusDto friendRequestStatusDto) {
        FriendRequest request = friendRequestRepository.findById(requestId).orElseThrow();
        request.setStatus(Status.valueOf(friendRequestStatusDto.getStatus().name()));
        friendRequestRepository.save(request);
        return modelMapper.map(request, FriendRequestDto.class);
    }

    public List<UserResponseDto> getFriends(Long userId) {
        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        List<User> friends = new ArrayList<>();

        var sentRequests = friendRequestRepository.findByReceiverAndStatus(user, Status.ACCEPTED);
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

}


package com.unibuc.fmi.review_everything.service;


import com.unibuc.fmi.review_everything.dto.friendrequest.request.FriendRequestDto;
import com.unibuc.fmi.review_everything.dto.friendrequest.response.FriendResponseDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import com.unibuc.fmi.review_everything.model.FriendRequest;
import com.unibuc.fmi.review_everything.model.Status;
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
import java.util.stream.Collectors;

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

    public List<FriendResponseDto> getFriendRequests(Long receiverId) {
        var receiver = userRepository.findById(receiverId).orElseThrow();
        var requests = friendRequestRepository.findByReceiverAndStatus(receiver, Status.WAITING);
        return requests.stream()
                .map(request -> modelMapper.map(request, FriendResponseDto.class))
                .collect(Collectors.toList());
    }

    public void handleFriendRequest(Long requestId, Status status) {
        var request = friendRequestRepository.findById(requestId).orElseThrow();
        request.setStatus(status);
        friendRequestRepository.save(request);
    }

    public List<UserResponseDto> getFriends(Long userId) {
        var user = userRepository.findById(userId).orElseThrow();
        List<User> friends = new ArrayList<>();

        var sentRequests = friendRequestRepository.findByReceiverAndStatus(user, Status.ACCEPTED);
        for (FriendRequest request : sentRequests) {
            friends.add(request.getReceiver());
        }

        var receivedRequests = friendRequestRepository.findByReceiverAndStatus(user, Status.ACCEPTED);
        for (FriendRequest request : receivedRequests) {
            friends.add(request.getSender());
        }

        var listType = new TypeToken<List<UserResponseDto>>() {}.getType();
        return modelMapper.map(friends, listType);
    }

}


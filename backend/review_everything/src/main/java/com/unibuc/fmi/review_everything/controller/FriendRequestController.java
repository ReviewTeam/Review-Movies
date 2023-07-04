package com.unibuc.fmi.review_everything.controller;

import com.unibuc.fmi.review_everything.dto.friendrequest.request.FriendRequestDto;
import com.unibuc.fmi.review_everything.dto.friendrequest.response.FriendResponseDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import com.unibuc.fmi.review_everything.model.Status;
import com.unibuc.fmi.review_everything.service.FriendRequestService;
import com.unibuc.fmi.review_everything.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/me/friends")
@RequiredArgsConstructor
public class FriendRequestController {
    private final FriendRequestService friendRequestService;
    private final UserService userService;

    @PostMapping("/{userId}")
    public ResponseEntity<Void> sendFriendRequest(@PathVariable Long userId) {
        var friendRequestDto = new FriendRequestDto(userService.getCurrentUser().getId(), userId);
        friendRequestService.sendFriendRequest(friendRequestDto);
        return ResponseEntity.ok().build();
    }

    @Secured({"ROLE_USER"})
    @GetMapping("/requests")
    public ResponseEntity<List<FriendResponseDto>> getFriendRequests() {
        return ResponseEntity.ok(friendRequestService.getFriendRequests(userService.getCurrentUser().getId()));
    }

    @PostMapping("/requests/{requestId}")
    public ResponseEntity<Void> handleFriendRequest(@PathVariable Long requestId, @RequestParam Status status) {
        friendRequestService.handleFriendRequest(requestId, status);
        return ResponseEntity.ok().build();
    }
    @Secured({"ROLE_USER"})
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getFriends() {
        return ResponseEntity.ok(friendRequestService.getFriends(userService.getCurrentUser().getId()));
    }
}

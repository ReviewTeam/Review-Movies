package com.unibuc.fmi.review_everything.controller;

import com.unibuc.fmi.review_everything.dto.review.response.ReviewResponseDto;
import com.unibuc.fmi.review_everything.dto.user.request.UserUpdateRequestDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import com.unibuc.fmi.review_everything.service.ReviewService;
import com.unibuc.fmi.review_everything.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/me")
@Secured({"ROLE_USER"})
public class MeController {
    private final UserService userService;
    private final ReviewService reviewService;
    @GetMapping
    public ResponseEntity<UserResponseDto> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PutMapping
    public ResponseEntity<UserResponseDto> updateCurrentUser(@RequestBody @Valid UserUpdateRequestDto userUpdateRequestDto) {
        return ResponseEntity.ok(userService.updateCurrentUser(userUpdateRequestDto));
    }
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewResponseDto>> getCurrentUserReviews() {
        var userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(reviewService.getUserReviews(userId));
    }

}
package com.unibuc.fmi.review_everything.controller;

import com.unibuc.fmi.review_everything.dto.review.request.ReviewRequestDto;
import com.unibuc.fmi.review_everything.dto.review.response.ReviewResponseDto;
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
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/me/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ReviewResponseDto> addReview(
            @RequestBody @Valid ReviewRequestDto reviewRequestDto) {
        var userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(reviewService.addReview(userId, reviewRequestDto));
    }
    @Secured({"ROLE_USER"})
    @GetMapping
    public ResponseEntity<List<ReviewResponseDto>> getUserReviews() {
        var userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(reviewService.getUserReviews(userId));
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponseDto> updateReview(
            @PathVariable Long reviewId,
            @RequestBody @Valid ReviewRequestDto reviewRequestDto) {
        var userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(reviewService.updateReview(userId, reviewId, reviewRequestDto));
    }
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        var userId = userService.getCurrentUser().getId();
        reviewService.deleteReview(userId, reviewId);

        return ResponseEntity.noContent().build();
    }
}




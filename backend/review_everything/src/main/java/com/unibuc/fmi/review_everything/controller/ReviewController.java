package com.unibuc.fmi.review_everything.controller;

import com.unibuc.fmi.review_everything.dto.review.request.ReviewRequestDto;
import com.unibuc.fmi.review_everything.dto.review.response.ReviewLikeInfo;
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
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    private final UserService userService;

    @Secured({"ROLE_USER"})
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

    @Secured({"ROLE_USER"})
    @GetMapping("/{movieId}")
    public ResponseEntity<List<ReviewResponseDto>> getMovieReviews(@PathVariable Long movieId) {
        return ResponseEntity.ok(reviewService.getMovieReviews(movieId));
    }

    @Secured({"ROLE_USER"})
    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponseDto> updateReview(
            @PathVariable Long reviewId,
            @RequestBody @Valid ReviewRequestDto reviewRequestDto) {
        var userId = userService.getCurrentUser().getId();
        return ResponseEntity.ok(reviewService.updateReview(userId, reviewId, reviewRequestDto));
    }

    @Secured({"ROLE_USER"})
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        var userId = userService.getCurrentUser().getId();
        reviewService.deleteReview(userId, reviewId);

        return ResponseEntity.noContent().build();
    }

    @Secured({"ROLE_USER"})
    @PostMapping("like-info/{reviewId}")
    public ResponseEntity<ReviewLikeInfo> getReviewLikeInfo(@PathVariable Long reviewId) {
        boolean likedByCurrentUser = reviewService.toggleLikeReview(reviewId);
        int nrLikes = reviewService.getNumberOfLikes(reviewId);
        ReviewLikeInfo likeInfo = new ReviewLikeInfo(nrLikes, likedByCurrentUser);
        return ResponseEntity.ok(likeInfo);
    }

}




package com.unibuc.fmi.review_everything.controller;

import com.unibuc.fmi.review_everything.dto.review.response.ReviewResponseDto;
import com.unibuc.fmi.review_everything.service.ReviewService;
import com.unibuc.fmi.review_everything.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/")
public class FeedController {
    private final UserService userService;
    private final ReviewService reviewService;

    @GetMapping("/feed")
    public ResponseEntity<List<ReviewResponseDto>> getFeed() {
        List<ReviewResponseDto> feed = reviewService.getFeed();
        return ResponseEntity.ok(feed);
    }
}

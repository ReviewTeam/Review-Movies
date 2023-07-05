package com.unibuc.fmi.review_everything.service;

import com.unibuc.fmi.review_everything.dto.review.request.ReviewRequestDto;
import com.unibuc.fmi.review_everything.dto.review.response.ReviewResponseDto;
import com.unibuc.fmi.review_everything.exception.movie.MovieNotFoundException;
import com.unibuc.fmi.review_everything.exception.review.ReviewNotFoundException;
import com.unibuc.fmi.review_everything.exception.user.UserNotFoundException;
import com.unibuc.fmi.review_everything.model.Movie;
import com.unibuc.fmi.review_everything.model.Review;
import com.unibuc.fmi.review_everything.repository.MovieRepository;
import com.unibuc.fmi.review_everything.repository.ReviewRepository;
import com.unibuc.fmi.review_everything.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;

    public ReviewResponseDto addReview(Long userId, ReviewRequestDto reviewRequestDto) {
        var review = modelMapper.map(reviewRequestDto, Review.class);
        review.setId(null);

        var movie = movieRepository.findById(reviewRequestDto.getMovieId()).orElseThrow(MovieNotFoundException::new);
        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        review.setMovie(movie);
        review.setUser(user);

        review.setRating(reviewRequestDto.getRating());
        review.setDescription(reviewRequestDto.getDescription());

        var savedReview = reviewRepository.save(review);

        return modelMapper.map(savedReview, ReviewResponseDto.class);
    }

    public List<ReviewResponseDto> getUserReviews(Long userId) {
        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        var reviews = reviewRepository.findByUser(user);

        var listType = new TypeToken<List<ReviewResponseDto>>() {}.getType();

        return modelMapper.map(reviews, listType);
    }

    public ReviewResponseDto updateReview(Long userId, Long reviewId, ReviewRequestDto reviewRequestDto) {
        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        var review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        if (!review.getUser().equals(user)) {
            throw new ReviewNotFoundException();
        }

        var movie = movieRepository.findById(reviewRequestDto.getMovieId()).orElseThrow(MovieNotFoundException::new);

        review.setRating(reviewRequestDto.getRating());
        review.setMovie(movie);
        review.setDescription(reviewRequestDto.getDescription());

        var updatedReview = reviewRepository.save(review);

        return modelMapper.map(updatedReview, ReviewResponseDto.class);
    }

    public void deleteReview(Long userId, Long reviewId) {
        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        var review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        if (!review.getUser().equals(user)) {
            throw new ReviewNotFoundException();
        }
        reviewRepository.delete(review);
    }
}


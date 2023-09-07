package com.unibuc.fmi.review_everything.service;

import com.unibuc.fmi.review_everything.dto.review.request.ReviewRequestDto;
import com.unibuc.fmi.review_everything.dto.review.response.ReviewResponseDto;
import com.unibuc.fmi.review_everything.exception.movie.MovieNotFoundException;
import com.unibuc.fmi.review_everything.exception.review.ReviewNotFoundException;
import com.unibuc.fmi.review_everything.exception.user.UserNotFoundException;
import com.unibuc.fmi.review_everything.model.FriendRequest;
import com.unibuc.fmi.review_everything.model.Movie;
import com.unibuc.fmi.review_everything.model.Review;
import com.unibuc.fmi.review_everything.model.User;
import com.unibuc.fmi.review_everything.repository.MovieRepository;
import com.unibuc.fmi.review_everything.repository.ReviewRepository;
import com.unibuc.fmi.review_everything.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final FriendRequestService friendRequestService;

    public ReviewResponseDto addReview(Long userId, ReviewRequestDto reviewRequestDto) {
        var review = modelMapper.map(reviewRequestDto, Review.class);
        review.setId(null);

        var movie = movieRepository.findById(reviewRequestDto.getMovieId()).orElseThrow(MovieNotFoundException::new);
        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        review.setMovie(movie);
        review.setUser(user);

        review.setRating(reviewRequestDto.getRating());
        review.setDescription(reviewRequestDto.getDescription());

        var createdAtDateTime = LocalDateTime.now();
        review.setCreatedAt(createdAtDateTime);

        var savedReview = reviewRepository.save(review);

        return modelMapper.map(savedReview, ReviewResponseDto.class);
    }

    public ReviewResponseDto findReviewById(Long reviewId) {
        var review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);
        return modelMapper.map(review, ReviewResponseDto.class);
    }

    public List<ReviewResponseDto> getUserReviews(Long userId) {
        var user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        var reviews = reviewRepository.findByUser(user);

        var listType = new TypeToken<List<ReviewResponseDto>>() {}.getType();

        return modelMapper.map(reviews, listType);
    }

    public List<ReviewResponseDto> findReviewsByUsername(String username) {
        // Obțineți utilizatorul pe baza numelui de utilizator
        var user = userRepository.findUserByUsername(username).orElseThrow(UserNotFoundException::new);
        var reviews = reviewRepository.findByUser(user);

        // Convertiți lista de review-uri în DTO-uri
        var listType = new TypeToken<List<ReviewResponseDto>>() {}.getType();
        return modelMapper.map(reviews, listType);
    }

    public List<ReviewResponseDto> getMovieReviews(Long movieId) {
        var movie = movieRepository.findById(movieId).orElseThrow(MovieNotFoundException::new);
        var reviews = reviewRepository.findByMovie(movie);

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

//    public void likeReview(Long reviewId) {
//        var user = userRepository.findById(userService.getCurrentUser().getId()).orElseThrow(UserNotFoundException::new);
//        var review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);
//
//        if (!review.getLikedByUsers().contains(user)) {
//            review.getLikedByUsers().add(user);
//            review.setNrLikes(review.getNrLikes() + 1);
//            reviewRepository.save(review);
//        }
//    }
//
//    public void unlikeReview(Long reviewId) {
//        var user = userRepository.findById(userService.getCurrentUser().getId()).orElseThrow(UserNotFoundException::new);
//        Review review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);
//
//        if (review.getLikedByUsers().contains(user)) {
//            review.getLikedByUsers().remove(user);
//            review.setNrLikes(review.getNrLikes() - 1);
//            reviewRepository.save(review);
//        }
//    }

    public boolean toggleLikeReview(Long reviewId) {
        var user = userRepository.findById(userService.getCurrentUser().getId()).orElseThrow(UserNotFoundException::new);
        var review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);

        if(review.getLikedByUsers().contains(user)) {
            review.getLikedByUsers().remove(user);
            review.setNrLikes(review.getNrLikes() - 1);
        }
        else {
            review.getLikedByUsers().add(user);
            review.setNrLikes(review.getNrLikes() + 1);
        }

        reviewRepository.save(review);
        return review.getLikedByUsers().contains(user);
    }

    public int getNumberOfLikes(Long reviewId) {
        var review = reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);
        return review.getNrLikes();
    }


    public List<ReviewResponseDto> getFeed() {

        List<Review> feed;

        var currentUser = userService.getCurrentUserOrNull();


        if(currentUser != null) {
            var userId = currentUser.getId();

            //var friends = userService.getFriends(userId);


            var friendsDto = friendRequestService.getFriends(userId);
            var friends = modelMapper.map(friendsDto, new TypeToken<List<User>>() {}.getType());

            feed = reviewRepository.findTop20ByUserInOrderByCreatedAtDesc((List<User>) friends);

            int remainingCount = 20 - feed.size();

            if (remainingCount > 0) {
                List<Review> remainingReviews = reviewRepository.findTop20ByOrderByCreatedAtDesc();
                remainingReviews.removeAll(feed);
                feed.addAll(remainingReviews.subList(0, Math.min(remainingCount, remainingReviews.size())));
            }
        }
        else {
            feed = reviewRepository.findTop20ByOrderByCreatedAtDesc();
        }
        var listType = new TypeToken<List<ReviewResponseDto>>() {}.getType();
        return modelMapper.map(feed, listType);
    }



}


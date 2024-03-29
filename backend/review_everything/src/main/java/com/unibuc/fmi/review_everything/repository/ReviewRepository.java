package com.unibuc.fmi.review_everything.repository;

import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import com.unibuc.fmi.review_everything.model.Movie;
import com.unibuc.fmi.review_everything.model.Review;
import com.unibuc.fmi.review_everything.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long>, PagingAndSortingRepository<Review, Long> {
    List<Review> findByUser(User user);
    List<Review> findByMovie(Movie movie);
    List<Review> findTop20ByUserInOrderByCreatedAtDesc(List<User> friends);
    List<Review> findTop20ByOrderByCreatedAtDesc();
}

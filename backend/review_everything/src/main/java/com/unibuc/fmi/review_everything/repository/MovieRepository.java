package com.unibuc.fmi.review_everything.repository;

import com.unibuc.fmi.review_everything.model.Movie;
import com.unibuc.fmi.review_everything.model.Person;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long>, PagingAndSortingRepository<Movie, Long> {
    List<Movie> findMoviesByTitleContainingIgnoreCase(String title, Pageable pageable);
}

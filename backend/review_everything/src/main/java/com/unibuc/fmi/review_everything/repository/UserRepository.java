package com.unibuc.fmi.review_everything.repository;

import com.unibuc.fmi.review_everything.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long>, PagingAndSortingRepository<User, Long> {
    Optional<User> findUserByUsername(String username);
    List<User> findUsersByUsernameContainingIgnoreCase(String username, Pageable pageable);
}

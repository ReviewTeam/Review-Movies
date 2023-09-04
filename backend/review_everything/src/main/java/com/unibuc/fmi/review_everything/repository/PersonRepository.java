package com.unibuc.fmi.review_everything.repository;

import com.unibuc.fmi.review_everything.model.Person;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long>, PagingAndSortingRepository<Person, Long> {
    @Query("SELECT p FROM Person p WHERE (:firstName IS NULL OR LOWER(p.firstName) = LOWER(:firstName)) " +
            "AND (:lastName IS NULL OR LOWER(p.lastName) = LOWER(:lastName))")
    List<Person> findPersonsByFirstNameAndLastName(String firstName, String lastName, Pageable pageable);
}

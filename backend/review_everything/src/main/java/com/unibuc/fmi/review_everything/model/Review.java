package com.unibuc.fmi.review_everything.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private User user;

    @Column(nullable = false)
    private int rating;

    @ManyToOne(cascade = CascadeType.REMOVE)
    private Movie movie;

    @Column(nullable = false)
    private String description;

    private int nrLikes;

    @ManyToMany
    private List<User> likedByUsers;
}

package com.unibuc.fmi.review_everything.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String shortDescription;

    @Column(nullable = false)
    private int year;

    @Lob
    @Column(nullable = true, columnDefinition = "LONGBLOB")
    private byte[] posterImage;

    @ManyToOne
    private Person director;

    @ManyToMany
    private List<Person> actors;
}
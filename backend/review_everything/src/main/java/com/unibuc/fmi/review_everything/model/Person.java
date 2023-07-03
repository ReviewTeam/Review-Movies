package com.unibuc.fmi.review_everything.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private LocalDate birthDate;

    @OneToMany(mappedBy = "director", cascade = CascadeType.ALL)
    private List<Movie> directedMovies;

    @ManyToMany(mappedBy = "actors", cascade = CascadeType.ALL)
    private List<Movie> actedInMovies;
}
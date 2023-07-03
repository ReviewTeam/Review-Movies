package com.unibuc.fmi.review_everything.dto.person.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.unibuc.fmi.review_everything.dto.movie.response.MovieResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class PersonResponseDto {
    private Long id;
    private String firstName;
    private String lastName;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate birthDate;

    private List<MovieResponseDto> directedMovies;
    private List<MovieResponseDto> actedInMovies;
}

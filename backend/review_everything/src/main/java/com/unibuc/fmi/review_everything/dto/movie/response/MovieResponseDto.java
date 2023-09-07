package com.unibuc.fmi.review_everything.dto.movie.response;

import com.unibuc.fmi.review_everything.dto.person.response.PersonResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieResponseDto {
    private Long id;
    private String title;
    private String shortDescription;
    private int year;
    private byte[] image;
    private PersonResponseDto director;
    private List<PersonResponseDto> actors;
}

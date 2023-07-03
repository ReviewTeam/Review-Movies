package com.unibuc.fmi.review_everything.dto.movie.response;
;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.unibuc.fmi.review_everything.dto.person.response.PersonResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class MovieResponseDto {
    private Long id;
    private String title;
    private String shortDescription;
    private int year;
    private byte[] posterImage;
    private PersonResponseDto director;
    private List<PersonResponseDto> actors;
}

package com.unibuc.fmi.review_everything.dto.movie.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieRequestDto {
    @NotBlank
    private String title;

    @NotBlank
    private String shortDescription;

    @NotNull
    private int year;

    private byte[] posterImage;

    @NotNull
    private Long directorId;
}
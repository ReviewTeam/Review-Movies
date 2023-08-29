package com.unibuc.fmi.review_everything.dto.review.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequestDto {
    @NotNull
    private Long movieId;

    @NotNull
    private int rating;

    @NotBlank
    private String description;
}

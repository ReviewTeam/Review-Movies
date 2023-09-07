package com.unibuc.fmi.review_everything.dto.review.response;

import com.unibuc.fmi.review_everything.dto.movie.response.MovieResponseDto;
import com.unibuc.fmi.review_everything.dto.user.response.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponseDto {
    private Long id;
    private UserResponseDto user;
//    private Long user_id;
//    private String username;
    private int rating;
    private MovieResponseDto movie;
//    private Long movie_id;
//    private String title;
//    private byte[] image;
    private String description;
    private int nrLikes;
    private List<UserResponseDto> likedByUsers;
}

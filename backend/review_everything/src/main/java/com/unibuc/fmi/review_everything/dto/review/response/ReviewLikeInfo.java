package com.unibuc.fmi.review_everything.dto.review.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewLikeInfo {
    private int nrLikes;
    private boolean likedByCurrentUser;
}

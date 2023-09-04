package com.unibuc.fmi.review_everything.dto.friendrequest.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequestDto {
    @NotNull
    private Long senderId;

    @NotNull
    private Long receiverId;
}

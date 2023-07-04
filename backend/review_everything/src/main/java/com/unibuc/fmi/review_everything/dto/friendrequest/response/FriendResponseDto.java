package com.unibuc.fmi.review_everything.dto.friendrequest.response;

import com.unibuc.fmi.review_everything.enums.Status;
import com.unibuc.fmi.review_everything.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendResponseDto {
    private Long id;
    private User sender;
    private User receiver;
    private Status status;
}

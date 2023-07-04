package com.unibuc.fmi.review_everything.dto.friendrequest.request;

import com.unibuc.fmi.review_everything.enums.StatusRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendRequestStatusDto {
    @NotNull
    private StatusRequest status;
}

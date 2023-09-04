package com.unibuc.fmi.review_everything.dto.user.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthRequestDto {
    @NotBlank
    @Size(min = 6, max = 25)
    private String username;

    @NotBlank
    @Size(min = 8, max = 25, message = "password must be between 8 and 25 characters")
    private String password;
}

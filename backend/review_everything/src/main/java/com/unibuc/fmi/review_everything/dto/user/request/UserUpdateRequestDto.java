package com.unibuc.fmi.review_everything.dto.user.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequestDto {
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z]+$", message = "first name must consist of alphabetical characters only and be 3-25 characters long")
    @Size(min = 3, max = 25)
    private String firstName;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z]+$", message = "last name must consist of alphabetical characters only and be 3-25 characters long")
    @Size(min = 3, max = 25)
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=])[A-Za-z\\d@#$%^&+=]{8,25}$", message = "password must be 8-25 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@#$%^&+=)")
    private String password;

    private byte[] image;
}

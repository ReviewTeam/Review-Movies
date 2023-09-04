package com.unibuc.fmi.review_everything.dto.person.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonRequestDto {
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z]+$", message = "first name must consist of alphabetical characters only and be 3-25 characters long")
    @Size(min = 3, max = 25)
    private String firstName;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z]+$", message = "last name must consist of alphabetical characters only and be 3-25 characters long")
    @Size(min = 3, max = 25)
    private String lastName;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate birthDate;

    private byte[] image;
}

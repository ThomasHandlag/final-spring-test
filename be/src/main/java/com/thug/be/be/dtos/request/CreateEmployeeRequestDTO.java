package com.thug.be.be.dtos.request;

import java.time.LocalDate;

import com.thug.be.be.enums.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateEmployeeRequestDTO {
    @Size(max = 160, min=4)
    @NotNull
    @NotBlank
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Full name must contain only letters and spaces")
    private String fullName;
    @Email
    private String email;
    private LocalDate dateOfBirth;
    private Gender gender;
    @Size(max = 15, min=10)
    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Invalid phone number")
    private String phoneNumber;
    private String password;
}

package com.thug.be.be.dtos.request;

import java.time.LocalDate;

import com.thug.be.be.enums.Gender;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateEmployeeRequestDTO {
    @Size(min = 4, max = 160)
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Full name must contain only letters and spaces")
    private String fullName;
    private LocalDate dateOfBirth;
    private Gender gender;
    @Size(min = 10, max = 15)
    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Invalid phone number")
    private String phoneNumber;
    private String password;
    private Boolean active;
}

package com.thug.be.be.dtos.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.thug.be.be.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateEmployeeResponseDTO {
    private Long id;
    private String fullName;
    private String email;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String phoneNumber;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

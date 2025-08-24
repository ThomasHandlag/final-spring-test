package com.thug.be.be.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.thug.be.be.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employees", indexes = { @Index(columnList = "email") })
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "full_name")
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private Gender gender;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean active = false;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Column(nullable = false, updatable = false, name="created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false, name="updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}


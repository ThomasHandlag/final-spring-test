package com.thug.be.be.mappers;

import com.thug.be.be.dtos.request.CreateEmployeeRequestDTO;
import com.thug.be.be.dtos.request.UpdateEmployeeRequestDTO;
import com.thug.be.be.dtos.response.CreateEmployeeResponseDTO;
import com.thug.be.be.entities.Employee;

public class EmployeeMapper {

    public static Employee toEntity(CreateEmployeeRequestDTO dto) {
        Employee employee = new Employee();
        employee.setFullName(dto.getFullName());
        employee.setEmail(dto.getEmail());
        employee.setDateOfBirth(dto.getDateOfBirth());
        employee.setGender(dto.getGender());
        employee.setPhoneNumber(dto.getPhoneNumber());
        employee.setHashedPassword(dto.getPassword());
        return employee;
    }

    public static Employee toEntity(UpdateEmployeeRequestDTO dto) {
        Employee employee = new Employee();
        employee.setFullName(dto.getFullName());
        employee.setDateOfBirth(dto.getDateOfBirth());
        employee.setGender(dto.getGender());
        employee.setPhoneNumber(dto.getPhoneNumber());
        employee.setHashedPassword(dto.getPassword());
        employee.setActive(dto.getActive());
        return employee;
    }

    public static CreateEmployeeResponseDTO toResponseDTO(Employee employee) {
        CreateEmployeeResponseDTO dto = new CreateEmployeeResponseDTO();
        dto.setId(employee.getId());
        dto.setFullName(employee.getFullName());
        dto.setEmail(employee.getEmail());
        dto.setDateOfBirth(employee.getDateOfBirth());
        dto.setGender(employee.getGender());
        dto.setPhoneNumber(employee.getPhoneNumber());
        dto.setActive(employee.getActive());
        dto.setCreatedAt(employee.getCreatedAt());
        dto.setUpdatedAt(employee.getUpdatedAt());
        return dto;
    }
}

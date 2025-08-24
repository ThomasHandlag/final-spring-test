package com.thug.be.be.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.thug.be.be.dtos.request.CreateEmployeeRequestDTO;
import com.thug.be.be.dtos.request.UpdateEmployeeRequestDTO;
import com.thug.be.be.dtos.response.CreateEmployeeResponseDTO;
import com.thug.be.be.entities.Employee;
import com.thug.be.be.exceptions.ResourceNotFoundException;
import com.thug.be.be.mappers.EmployeeMapper;
import com.thug.be.be.repositories.EmployeeRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public CreateEmployeeResponseDTO createEmployee(@Valid CreateEmployeeRequestDTO requestDTO) {
        Employee employee = new Employee();
        employee.setFullName(requestDTO.getFullName());
        employee.setEmail(requestDTO.getEmail());
        employee.setDateOfBirth(requestDTO.getDateOfBirth());
        employee.setGender(requestDTO.getGender());
        employee.setPhoneNumber(requestDTO.getPhoneNumber());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        employee.setHashedPassword(encoder.encode(requestDTO.getPassword()));
        return EmployeeMapper.toResponseDTO(employeeRepository.save(employee));
    }

    public boolean updateEmployee(Long id, @Valid UpdateEmployeeRequestDTO requestDTO) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        employee.setFullName(requestDTO.getFullName());
        employee.setDateOfBirth(requestDTO.getDateOfBirth());
        employee.setGender(requestDTO.getGender());
        employee.setPhoneNumber(requestDTO.getPhoneNumber());
        employee.setActive(requestDTO.getActive());
        if (requestDTO.getPassword() != null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            employee.setHashedPassword(encoder.encode(requestDTO.getPassword()));
        }
        employeeRepository.save(employee);
        return true;
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        employeeRepository.delete(employee);
    }

public Page<CreateEmployeeResponseDTO> getAllEmployees(int page, int size) {
    Pageable pageable = PageRequest.of(page, size);
    Page<Employee> employeePage = employeeRepository.findAll(pageable);
    
    return employeePage.map(EmployeeMapper::toResponseDTO);
}

    public CreateEmployeeResponseDTO getEmployeeById(Long id) {
        return employeeRepository.findById(id).map(EmployeeMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
    }

    public Long countEmployees() {
        return employeeRepository.count();
    }
}

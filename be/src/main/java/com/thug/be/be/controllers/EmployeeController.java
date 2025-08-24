package com.thug.be.be.controllers;

import com.thug.be.be.dtos.request.CreateEmployeeRequestDTO;
import com.thug.be.be.dtos.request.UpdateEmployeeRequestDTO;
import com.thug.be.be.dtos.response.CreateEmployeeResponseDTO;
import com.thug.be.be.services.EmployeeService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createEmployee(@RequestBody @Valid CreateEmployeeRequestDTO requestDTO) {
        CreateEmployeeResponseDTO responseDTO = employeeService.createEmployee(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("result", responseDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getEmployee(@PathVariable("id") Long id) {
        CreateEmployeeResponseDTO employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(Map.of("result", employee));
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllEmployees(
            @RequestParam(defaultValue = "1", name = "page") int page,
            @RequestParam(defaultValue = "10", name = "limit", required = false) Integer limit) {

        int pageSize = (limit != null) ? limit : 10;
        Page<CreateEmployeeResponseDTO> employeePage = employeeService.getAllEmployees(page - 1, pageSize);

        return ResponseEntity.ok(Map.of("result", employeePage.getContent()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateEmployee(@PathVariable("id") Long id,
            @RequestBody @Valid UpdateEmployeeRequestDTO employee) {
        employeeService.updateEmployee(id, employee);
        return ResponseEntity.ok(Map.of("result", "Employee updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(Map.of("result", "Employee deleted successfully"));
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> count() {
        return ResponseEntity.ok(Map.of("result", employeeService.countEmployees()));
    }

}

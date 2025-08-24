package com.thug.be.be.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thug.be.be.entities.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
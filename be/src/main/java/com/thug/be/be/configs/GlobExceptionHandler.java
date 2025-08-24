package com.thug.be.be.configs;

import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.thug.be.be.exceptions.ResourceNotFoundException;

@ControllerAdvice
public class GlobExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(ResourceNotFoundException ex) {
        printLog(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "error", "Resource not found"));
    }

    @ExceptionHandler(org.hibernate.exception.JDBCConnectionException.class)
    public ResponseEntity<Map<String, Object>> handleDBConnectionIssue(Exception ex) {
        printLog(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "error", "Database connection error"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        printLog(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "error", ex.getMessage()));
    }

    private void printLog(String message) {
        Logger.getLogger(GlobExceptionHandler.class.getName()).log(Level.SEVERE, message);
    }
}

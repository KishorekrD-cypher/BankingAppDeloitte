package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminApprovalController {

    @Autowired
    private UserRepository userRepository;

    // Endpoint to get a list of pending employees (those who are not approved yet and not admins)
    @GetMapping("/pending-users")
    public ResponseEntity<List<User>> getPendingEmployees() {
        List<User> pendingUsers = userRepository.findByIsApprovedAndIsAdminFalse(false);  // Use the new repository method
        if (pendingUsers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.ok(pendingUsers);
    }

    // Fetch all approved users
    @GetMapping("/approved-users")
    public ResponseEntity<List<User>> getApprovedUsers() {
        List<User> approvedUsers = userRepository.findByIsApproved(true);
        if (approvedUsers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        }
        return ResponseEntity.ok(approvedUsers);
    }

    // Endpoint to approve an employee
    @PutMapping("/approve/{employee_id}")
    public ResponseEntity<String> approveEmployee(@PathVariable Integer employee_id) {
        Optional<User> employeeOptional = userRepository.findById(employee_id);
        if (employeeOptional.isPresent()) {
            User user = employeeOptional.get();
            user.setApproved(true);
            userRepository.save(user);
            return ResponseEntity.ok("Employee approved successfully. Account number: " + user.getAccountNumber());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee with ID " + employee_id + " not found.");
        }
    }

    // Remove a user by their ID
    @DeleteMapping("/remove-user/{employee_id}")
    public ResponseEntity<String> removeUser(@PathVariable int employee_id) {
        Optional<User> userOptional = userRepository.findById(employee_id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userRepository.delete(user);
            return ResponseEntity.ok("User with ID " + employee_id + " removed successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with ID " + employee_id + " not found.");
        }
    }
}

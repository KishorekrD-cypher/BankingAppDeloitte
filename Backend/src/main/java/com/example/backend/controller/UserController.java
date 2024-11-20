package com.example.backend.controller;

import com.example.backend.Dto.LoginDto;
import com.example.backend.Dto.SendMoneyDto;
import com.example.backend.Dto.UserDto;
import com.example.backend.Dto.WithdrawMoneyDto;
import com.example.backend.entity.Transaction;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.LoginResponse;
import com.example.backend.service.TransactionService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionService transactionService;


    // Endpoint for user registration
    @PostMapping("/register")
    public ResponseEntity<String> addEmployee(@RequestBody UserDto userDto) {
        String response = userService.addEmployee(userDto);
        return ResponseEntity.ok(response);
    }

    // Endpoint for employee login with approval check
    @PostMapping("/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail());

        if (user != null) {
            if (user.isApproved()) {
                LoginResponse loginResponse = userService.loginEmployee(loginDto);
                return ResponseEntity.ok(loginResponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Your account is not approved yet. Please wait for admin approval.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid credentials.");
        }
    }

    //fetch account details
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(@RequestParam String email) {
        User user = userRepository.findByEmail(email);

        if (user != null) {
            if (!user.isAdmin()) {
                Map<String, Object> accountDetails = new HashMap<>();
                accountDetails.put("user_name", user.getUser_name());
                accountDetails.put("accountBalance", user.getAccountBalance());
                return ResponseEntity.ok(accountDetails);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Admins do not have account details.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @GetMapping("/account-details")
    public ResponseEntity<?> getAccountDetails(@RequestParam String email) {
        // Find user by email
        User user = userRepository.findByEmail(email);

        if (user != null) {
            UserDto userDto = new UserDto();
            userDto.setUser_id(Long.valueOf(user.getUser_id()));
            userDto.setUser_name(user.getUser_name());
            userDto.setEmail(user.getEmail());
            userDto.setPhone_number(user.getPhone_number());
            userDto.setGender(user.getGender());
            userDto.setAccountNumber(user.getAccountNumber());
            userDto.setAccountBalance((long) user.getAccountBalance());

            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    // Update user details
    @PutMapping("/update")
    public ResponseEntity<?> updateUserDetails(@RequestBody UserDto userDto) {
        // Fetch the user from the database
        User user = userRepository.findByEmail(userDto.getEmail());

        if (user != null) {
            user.setUser_name(userDto.getUser_name());
            user.setPhone_number(userDto.getPhone_number());

            userRepository.save(user);

            return ResponseEntity.ok("User details updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam String email) {
        // Find user by email
        User user = userRepository.findByEmail(email);

        if (user != null) {
            userRepository.delete(user);
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    // Add Money
    @PostMapping("/payments/add-money")
    public ResponseEntity<Map<String, Double>> addMoney(@RequestBody UserDto request) {
        String email = request.getEmail();
        double amountToAdd = request.getAmountToAdd();

        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", null));
        }

        // Update the balance
        double updatedBalance = user.getAccountBalance() + amountToAdd;
        user.setAccountBalance(updatedBalance);
        userRepository.save(user);

        // Record the transaction
        transactionService.recordTransaction(email, "Credited", amountToAdd, updatedBalance);

        return ResponseEntity.ok(Map.of("newBalance", updatedBalance));
    }

    // Send Money
    @PostMapping("/payments/send-money")
    public ResponseEntity<Map<String, Object>> sendMoney(@RequestBody SendMoneyDto request) {
        String email = request.getEmail();
        String recipientAccountNumber = request.getAccountNumber();
        double amountToSend = request.getAmountToSend();

        User sender = userRepository.findByEmail(email);
        if (sender == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Sender not found"));
        }

        User recipient = userRepository.findByAccountNumber(recipientAccountNumber);
        if (recipient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Recipient not found"));
        }

        if (sender.getAccountBalance() < amountToSend) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Insufficient funds"));
        }

        sender.setAccountBalance(sender.getAccountBalance() - amountToSend);
        userRepository.save(sender);
        recipient.setAccountBalance(recipient.getAccountBalance() + amountToSend);
        userRepository.save(recipient);

        transactionService.recordTransaction(email, "Send Money", amountToSend, sender.getAccountBalance());

        return ResponseEntity.ok(Map.of("newBalance", sender.getAccountBalance()));
    }

    // Withdraw Money
    @PostMapping("/payments/withdraw-money")
    public ResponseEntity<Map<String, Object>> withdrawMoney(@RequestBody WithdrawMoneyDto request) {
        String email = request.getEmail();
        double amountToWithdraw = request.getAmountToWithdraw();

        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        }

        if (user.getAccountBalance() < amountToWithdraw) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Insufficient funds"));
        }

        // Deduct money from user
        user.setAccountBalance(user.getAccountBalance() - amountToWithdraw);
        userRepository.save(user);

        // Record the transaction
        transactionService.recordTransaction(email, "Withdraw", amountToWithdraw, user.getAccountBalance());

        return ResponseEntity.ok(Map.of("newBalance", user.getAccountBalance()));
    }

    // Get Transaction History
    @GetMapping("/transactions/history")
    public ResponseEntity<List<Transaction>> getTransactionHistory(@RequestParam String email) {
        List<Transaction> transactions = transactionService.getTransactionHistory(email);
        if (transactions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(transactions);
        }
        return ResponseEntity.ok(transactions);
    }
}

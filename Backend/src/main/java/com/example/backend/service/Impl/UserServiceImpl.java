package com.example.backend.service.Impl;

import com.example.backend.service.UserService;
import com.example.backend.Dto.UserDto;
import com.example.backend.Dto.LoginDto;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addEmployee(UserDto userDto) {

        User user = new User();

        user.setUser_name(userDto.getUser_name());
        user.setEmail(userDto.getEmail());
        user.setPhone_number(userDto.getPhone_number());
        user.setGender(userDto.getGender());

        if (user.getAccountNumber() == null || user.getAccountNumber().isEmpty()) {
            user.setAccountNumber(generateAccountNumber());  // Set generated account number
        }
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        user.setAdmin(false);
        user.setApproved(false);

        userRepository.save(user);

        return "User " + user.getUser_name() + " added successfully with Account Number: " + user.getAccountNumber();
    }
    private String generateAccountNumber() {
        long min = 100000000000L;
        long max = 999999999999L;
        return String.valueOf(ThreadLocalRandom.current().nextLong(min, max + 1));
    }

    @Override
    public LoginResponse loginEmployee(LoginDto loginDto) {
        User user1 = userRepository.findByEmail(loginDto.getEmail());

        if (user1 != null) {
            String enteredPassword = loginDto.getPassword();

            if (passwordEncoder.matches(enteredPassword, user1.getPassword())) {
                return new LoginResponse("Login Success", true);
            } else {
                return new LoginResponse("Password does not match", false);
            }
        } else {
            return new LoginResponse("Email does not exist", false);
        }
    }


}

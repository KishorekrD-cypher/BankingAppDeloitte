package com.example.backend.service;

import com.example.backend.Dto.UserDto;
import com.example.backend.Dto.LoginDto;
import com.example.backend.response.LoginResponse;

import java.util.List;

public interface UserService {
    String addEmployee(UserDto userDto);

    LoginResponse loginEmployee(LoginDto loginDto);



}

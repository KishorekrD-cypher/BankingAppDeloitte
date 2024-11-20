package com.example.backend.Dto;

public class UserDto {
    private Long user_id;
    private String user_name;
    private String email;
    private String password;
    private String phone_number;
    private String gender;
    private long accountBalance;
    private String accountNumber;
    private double amountToAdd;

    // Constructor with all fields
    public UserDto(Long user_id, String user_name, String email, String password,
                   String phone_number, String gender, long accountBalance, String accountNumber, double amountToAdd) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.gender = gender;
        this.accountBalance = accountBalance; // Set accountBalance in the constructor
        this.accountNumber = accountNumber;
        this.amountToAdd =amountToAdd;
    }

    // Default constructor
    public UserDto() {
    }

    // Getters and setters
    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public long getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(long accountBalance) {
        this.accountBalance = accountBalance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public double getAmountToAdd() {
        return amountToAdd;
    }

    public void setAmountToAdd(double amountToAdd) {
        this.amountToAdd = amountToAdd;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "user_id=" + user_id +
                ", user_name='" + user_name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phone_number='" + phone_number + '\'' +
                ", gender='" + gender + '\'' +
                ", accountBalance=" + accountBalance +
                ", accountNumber=" + accountNumber + '\'' +
                ", amounttoadd=" + amountToAdd +
                '}';
    }
}

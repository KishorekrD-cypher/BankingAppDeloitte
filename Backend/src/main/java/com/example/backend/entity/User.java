package com.example.backend.entity;

import jakarta.persistence.*;

import java.util.concurrent.ThreadLocalRandom;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;

    private String user_name;

    private String email;

    private String password;

    private String phone_number;

    private String gender;

    private boolean isAdmin = false;

    @Column(name = "is_approved", nullable = false)
    private boolean isApproved = false;

    private String accountNumber;


    @Column(name = "account_balance")
    private double accountBalance;

    // Constructor with all parameters
    public User(int user_id, String user_name, String email, String gender, String phone_number, String password, boolean isAdmin, boolean isApproved, String accountNumber, double accountBalance) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.email = email;
        this.gender = gender;
        this.phone_number = phone_number;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isApproved = isApproved;
        this.accountNumber = accountNumber;
        this.accountBalance = isAdmin ? accountBalance : 0L;
    }

    // Default constructor
    public User() {}

    // Account number generation 12-D
    public String generateAccountNumber() {

        long min = 100000000000L;
        long max = 999999999999L;
        return String.valueOf(ThreadLocalRandom.current().nextLong(min, max + 1));
    }

    // Getters and Setters
    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
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

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }


    public double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(double accountBalance) {
        if (this.accountBalance == accountBalance) {
            return;
        }

        if (this.isAdmin) {
            this.accountBalance = accountBalance;
        } else {
            this.accountBalance = accountBalance;
        }
    }



    @Override
    public String toString() {
        return "User{" +
                "user_id=" + user_id +
                ", user_name='" + user_name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phone_number='" + phone_number + '\'' +
                ", gender='" + gender + '\'' +
                ", accountNumber='" + accountNumber + '\'' +
                ", accountBalance=" + accountBalance +
                '}';
    }
}

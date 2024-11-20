package com.example.backend.Dto;

public class SendMoneyDto {
    private String email;
    private String accountNumber;
    private double amountToSend;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public double getAmountToSend() {
        return amountToSend;
    }

    public void setAmountToSend(double amountToSend) {
        this.amountToSend = amountToSend;
    }
}

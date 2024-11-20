package com.example.backend.Dto;

public class PaymentRequest {

    private String email;
    private Double amountToAdd;
    private Double amountToSend;
    private Double amountToWithdraw;
    private String accountNumber;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getAmountToAdd() {
        return amountToAdd;
    }

    public void setAmountToAdd(Double amountToAdd) {
        this.amountToAdd = amountToAdd;
    }

    public Double getAmountToSend() {
        return amountToSend;
    }

    public void setAmountToSend(Double amountToSend) {
        this.amountToSend = amountToSend;
    }

    public Double getAmountToWithdraw() {
        return amountToWithdraw;
    }

    public void setAmountToWithdraw(Double amountToWithdraw) {
        this.amountToWithdraw = amountToWithdraw;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }
}


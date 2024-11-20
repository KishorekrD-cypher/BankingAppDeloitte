package com.example.backend.Dto;

public class WithdrawMoneyDto {
        private String email;
        private double amountToWithdraw;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getAmountToWithdraw() {
        return amountToWithdraw;
    }

    public void setAmountToWithdraw(double amountToWithdraw) {
        this.amountToWithdraw = amountToWithdraw;
    }

    }



package com.example.backend.service;

import com.example.backend.entity.Transaction;

import java.util.List;

public interface TransactionService {
    void recordTransaction(String userEmail, String transactionType, Double amount, Double balanceAfterTransaction);
    List<Transaction> getTransactionHistory(String userEmail);
}


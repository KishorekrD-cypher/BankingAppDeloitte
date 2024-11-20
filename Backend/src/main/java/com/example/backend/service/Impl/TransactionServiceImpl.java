package com.example.backend.service.Impl;

import com.example.backend.entity.Transaction;
import com.example.backend.repository.TransactionRepository;
import com.example.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public void recordTransaction(String userEmail, String transactionType, Double amount, Double balanceAfterTransaction) {
        Transaction transaction = new Transaction();
        transaction.setUserEmail(userEmail);
        transaction.setTransactionType(transactionType);
        transaction.setAmount(amount);
        transaction.setBalanceAfterTransaction(balanceAfterTransaction);
        transaction.setTransactionDate(LocalDateTime.now());

        transactionRepository.save(transaction);  // Save transaction to DB
    }

    @Override
    public List<Transaction> getTransactionHistory(String userEmail) {
        return transactionRepository.findByUserEmail(userEmail);
    }
}



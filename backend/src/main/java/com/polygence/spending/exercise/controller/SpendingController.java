package com.polygence.spending.exercise.controller;

import com.polygence.spending.exercise.model.SpendingItem;
import com.polygence.spending.exercise.service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/spendings")
public class SpendingController {

    @Autowired
    private SpendingService spendingService;

    @GetMapping
    public List<SpendingItem> getAllSpendings() {
        return spendingService.getSpendings();
    }

    @GetMapping("/{id}")
    public SpendingItem getSpendingById(@PathVariable Long id) {
        return spendingService.getSpendingItemById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createSpendingItem(@RequestBody SpendingItem spendingItem) {
        spendingService.createSpendingItem(spendingItem);
    }




}

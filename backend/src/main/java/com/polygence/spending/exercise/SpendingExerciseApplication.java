package com.polygence.spending.exercise;

import com.polygence.spending.exercise.dto.SpendingItem;
import com.polygence.spending.exercise.service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;

@SpringBootApplication
public class SpendingExerciseApplication implements CommandLineRunner {

    @Autowired
    SpendingService spendingService;

    public static void main(String[] args) {
        SpringApplication.run(SpendingExerciseApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        spendingService.createSpendingItem(
                new SpendingItem("Book", 24, LocalDateTime.now().minusHours(3), "USD"));
        spendingService.createSpendingItem(
                new SpendingItem("Trousers", 16700, LocalDateTime.now(), "HUF"));
    }
}

package com.polygence.spending.exercise.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SpendingItem {

    private String description;
    private int amount;
    private LocalDateTime spentAt;
    private String currency;

}

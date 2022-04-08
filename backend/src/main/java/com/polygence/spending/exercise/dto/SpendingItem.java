package com.polygence.spending.exercise.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpendingItem {

    private long id;
    private String description;
    private int amount;
    private LocalDateTime spentAt;
    private String currency;

}

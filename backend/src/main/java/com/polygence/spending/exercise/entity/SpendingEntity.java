package com.polygence.spending.exercise.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class SpendingEntity {

    @Id
    private long id;
    private String description;
    private int amount;
    private LocalDateTime spentAt;
    private String currency;
}

package com.polygence.spending.exercise.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
@Table
public class Spending {

    @Id
    @GeneratedValue
    private long id;
    private String description;
    private int amount;
    private LocalDateTime spentAt;
    private String currency;
}

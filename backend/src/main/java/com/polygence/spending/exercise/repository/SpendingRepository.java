package com.polygence.spending.exercise.repository;

import com.polygence.spending.exercise.entity.Spending;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SpendingRepository extends JpaRepository<Spending, Long> {

}

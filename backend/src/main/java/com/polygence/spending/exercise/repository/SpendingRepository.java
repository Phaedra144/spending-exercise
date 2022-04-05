package com.polygence.spending.exercise.repository;

import com.polygence.spending.exercise.entity.SpendingEntity;
import com.polygence.spending.exercise.model.SpendingItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SpendingRepository extends JpaRepository<SpendingEntity, Long> {

}

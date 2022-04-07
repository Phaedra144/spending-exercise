package com.polygence.spending.exercise.service;

import com.polygence.spending.exercise.entity.Spending;
import com.polygence.spending.exercise.dto.SpendingItem;
import com.polygence.spending.exercise.repository.SpendingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SpendingService {

    @Autowired
    SpendingRepository spendingRepository;

     ModelMapper mapper = new ModelMapper();
    
    public List<SpendingItem> getSpendings() {
        return spendingRepository.findAll()
                .stream().map(sp -> mapper.map(sp, SpendingItem.class))
                .sorted(Comparator.comparing(SpendingItem::getSpentAt).reversed())
                .collect(Collectors.toList());
    }

    public SpendingItem getSpendingItemById(Long id) {
        return mapper.map(spendingRepository.getById(id), SpendingItem.class);
    }

    public void createSpendingItem(SpendingItem spendingItem) {
        spendingRepository.save(mapper.map(spendingItem, Spending.class));
    }
}

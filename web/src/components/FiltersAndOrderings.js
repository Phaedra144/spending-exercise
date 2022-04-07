import React, { useState, useEffect } from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';


const sortSpendings = (spendings, type, ascending) => {
  return spendings.sort((spendingA, spendingB) => {

    if (type === 'date') {
      if (ascending) {
        return spendingA.spentAt.localeCompare(spendingB.spentAt);
      } else {
        return spendingB.spentAt.localeCompare(spendingA.spentAt);
      }
    }

    if (type === 'amount') {
      if (ascending) {
        return spendingA.amount > spendingB.amount ? 1 : -1;
      } else {
        return spendingA.amount < spendingB.amount ? 1 : -1;
      }
    }
  });
};

const getType = (selectedValue) => {
  return selectedValue.includes('date') ? 'date' : 'amount';
};

const getOrderType = (selectedValue) => {
  return !selectedValue.includes('-') ? true : false;
};



export default function CurrencyFilter({ spendingList, onSpendingChange }) {

  const [orderedFilteredList, setOrderedFilteredList] = useState([]);

  const orderingHandler = (event) => {
    const selectedValue = event.target.value;
    console.log('Selected value: ' + selectedValue);
    const sortedList = sortSpendings(spendingList, getType(selectedValue), getOrderType(selectedValue));
    setOrderedFilteredList(() => {
      return [...sortedList];
    });
  }

  useEffect(() => {
    onSpendingChange(orderedFilteredList);
  }, [orderedFilteredList]);

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={orderingHandler}>
            <option value='-date'>Sort by Date descending (default)</option>
            <option value='date'>Sort by Date ascending</option>
            <option value='-amount_in_huf'>Sort by Amount descending</option>
            <option value='amount_in_huf'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              name=''
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='HUF'
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='USD'
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}

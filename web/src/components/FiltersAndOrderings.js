import React from 'react';
import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';


const filterSpendings = (spendings, type) => {
    return spendings.filter(sp => sp.currency === type);
};

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


export default function CurrencyFilter({ spendingList, onSpendingChange, fullList }) {

  const filterHUFHandler = () => {
    const filteredList = filterSpendings(fullList, 'HUF');
    onSpendingChange(filteredList);
  };

  const filterUSDHandler = () => {
    const filteredList = filterSpendings(fullList, 'USD');
    onSpendingChange(filteredList);
  };

  const revokeFilterHandler = () => {
    onSpendingChange(fullList);
  };

  const orderingHandler = (event) => {
    const selectedValue = event.target.value;
    console.log('Selected value: ' + selectedValue);
    const sortedList = sortSpendings(spendingList, getType(selectedValue), getOrderType(selectedValue));
    onSpendingChange(sortedList);
  }

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
              onClick={revokeFilterHandler}
              name=''
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              onClick={filterHUFHandler}
              name='HUF'
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              onClick={filterUSDHandler}
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

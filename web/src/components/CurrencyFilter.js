import React from 'react';
import { FiltersWrapper, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';


const filterSpendings = (spendings, type) => {
  return spendings.filter(sp => sp.currency === type);
};


export default function CurrencyFilter({ fullList, onSpendingChange }) {

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

  return (
    <>
      <FiltersWrapper>
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

import React from 'react';
import { FiltersWrapper, Orderings } from '../styles/ComponentStyles';

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

const Ordering = ({ spendingList, onSpendingChange }) => {

    const orderingHandler = (event) => {
        const selectedValue = event.target.value;
        console.log('Selected value: ' + selectedValue);
        const sortedList = sortSpendings(spendingList, getType(selectedValue), getOrderType(selectedValue));
        onSpendingChange(sortedList);
    }

    return (
        <Orderings>
            <select onChange={orderingHandler}>
                <option value='-date'>Sort by Date descending (default)</option>
                <option value='date'>Sort by Date ascending</option>
                <option value='-amount_in_huf'>Sort by Amount descending</option>
                <option value='amount_in_huf'>Sort by Amount ascending</option>
            </select>
        </Orderings>
    );

};

export default Ordering;
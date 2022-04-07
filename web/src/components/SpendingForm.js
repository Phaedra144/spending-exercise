import React, { useRef, useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { FormStyles } from '../styles/ComponentStyles';
import Loader from './Loader';

export default function SpendingForm({ onNewItem, errorHttp, status }) {

  const [error, setError] = useState();

  const descriptionRef = useRef();
  const amountRef = useRef();
  const currencyRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredDescription = descriptionRef.current.value;
    const eneteredAmount = amountRef.current.value;

    if (enteredDescription.length === 0 || eneteredAmount.length === 0) {
      setError({
        message: 'Please enter a valid description and amount (non-empty values)'
      });
      setToDefault();
      return;
    }

    const spendingItem = {
      id: Math.random().toString(),
      description: enteredDescription,
      amount: eneteredAmount,
      currency: currencyRef.current.value,
      spentAt: new Date()
    }
    setError();  
    onNewItem(spendingItem);
    setToDefault();
  };

  const setToDefault = () => {
    descriptionRef.current.value = '';
    amountRef.current.value = '';
  };

  if (status === 'pending') {
    return (
      <Loader />
    );
  }

  return (
    <>
      <FormStyles onSubmit={submitHandler}>
        <InputStyles
          type='text'
          placeholder='description'
          name='description'
          ref={descriptionRef}
        />
        <InputStyles
          type='number'
          placeholder='amount'
          name='amount'
          ref={amountRef}
        />
        <SelectStyles
          name='currency'
          ref={currencyRef}
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value='Save' />
        {error && <span style={{color: 'red'}}>{error.message}</span> }
      </FormStyles>
    </>
  );
}

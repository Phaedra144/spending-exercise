import React, { useRef } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { ErrorMessage, FormStyles } from '../styles/ComponentStyles';
import { DateTime } from 'luxon';
import Loader from './Loader';

export default function SpendingForm({ onNewItem, error, status }) {

  const descriptionRef = useRef();
  const amountRef = useRef();
  const currencyRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const spendingItem = {
      id: Math.random().toString(),
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      currency: currencyRef.current.value,
      spentAt: DateTime.now()
    }

    onNewItem(spendingItem);
    setToDefault();
  };

  const setToDefault = () => {
    descriptionRef.current.value = '';
    amountRef.current.value = '';
    currencyRef.current.value = '';
  };

  if (status === 'pending') {
    return (
      <Loader />
    );
  }

  return (
    <>
      {(error) && <ErrorMessage> Could not save spending. Please try again later. </ErrorMessage>}
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
      </FormStyles>
    </>
  );
}

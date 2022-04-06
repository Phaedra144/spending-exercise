import React from "react";
import SpendingItem from "./SpendingItem";

import { ErrorMessage } from '../styles/ComponentStyles';
import Loader from './Loader';

export default function SpendingList({ data: loadedSpendings, error, status }) {

  if (status === 'pending') {
    return (
      <Loader />
    );
  }

  if (status === 'completed' && !error && (!loadedSpendings || !loadedSpendings.length)) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
        Yay!{" "}
        <span role="img" aria-label="jsx-a11y/accessible-emoji">
          🎉
        </span>{" "}
        No spendings!
      </h1>
    )
  }

  if (error) {
    return (
      <ErrorMessage>
        The server is probably down. Please try again later.
      </ErrorMessage>
    );
  }

  return (
    <>
      {loadedSpendings.length > 0 &&
        loadedSpendings.map((spending) => (
          <SpendingItem
            key={spending.id}
            id={spending.id}
            date={spending.spentAt}
            currency={spending.currency}
            description={spending.description}
            amount={spending.amount}
          />
        ))}
    </>
  );
}

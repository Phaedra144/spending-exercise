import React from "react";
import { FiDollarSign } from "react-icons/fi";
import { DateTime } from "luxon";
import {
    Spending,
    IconWrapper,
    TextWrapper,
    Amount,
    AmountWrapper,
  } from "../styles/ComponentStyles";

const SpendingItem = ({ id, date, currency, description, amount }) => {
    return (
        <Spending key={id}>
            <IconWrapper>
                <FiDollarSign color="var(--color-blue)" />
            </IconWrapper>
            <TextWrapper>
                <h3>{description}</h3>
                <p>
                    {DateTime.fromISO(date).toFormat(
                        "t - MMMM dd, yyyy"
                    )}
                </p>
            </TextWrapper>
            <AmountWrapper>
                <Amount currency={currency}>
                    {(amount / 100).toFixed(2)}
                </Amount>
            </AmountWrapper>
        </Spending>
    );
};

export default SpendingItem;
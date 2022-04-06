import React, { useState } from 'react';

const SpendingContext = React.createContext({
    spendingItems: [],
    onNewItem: (spending) => {}
});

export const SpendingContextProvider = (props) => {
    const [spendings, setSpendings] = useState([]);

    const newSpendingHandler = (spending) => {
        setSpendings((prevSpendingss) => {
            return [spending, ...prevSpendingss];
          });
    };

    return (
        <SpendingContext.Provider
            value={{
                spendingItems: spendings,
                onNewItem: newSpendingHandler,
            }}
        >
            {props.children}
        </SpendingContext.Provider>
    );
};

export default SpendingContext;

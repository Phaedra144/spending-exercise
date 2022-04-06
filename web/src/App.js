import React, { useEffect, useState } from 'react';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';
import SpendingForm from './components/SpendingForm';
import { createSpending, getAllSpendings } from './lib/api';
import useHttp from './hooks/use-http';

export default function App() {

  const [spendings, setSpendings] = useState();

  const {
    sendRequest: getSpendings,
    data: loadedSpendings,
    error: getSendingError,
    status: getSendingStatus
  } = useHttp(getAllSpendings, true);

  const { 
    sendRequest: addSpending, 
    status: createSendingStatus 
  } = useHttp(createSpending, false);

  useEffect(() => {
    getSpendings();
  }, [getSpendings]);

  useEffect(() => {
    setSpendings(loadedSpendings);
  }, [loadedSpendings]);

  const newSpendingHandler = (spending) => {
    addSpending(spending);
    getSpendings();
  };

  return (
    <>
      <Layout>
        <SpendingForm
          onNewItem={newSpendingHandler}
          status={createSendingStatus}
        />
        <FiltersAndOrderings />
        <SpendingList
          data={spendings}
          error={getSendingError}
          status={getSendingStatus}
        />
      </Layout>
    </>
  );
}

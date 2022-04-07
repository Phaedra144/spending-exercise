import React, { useEffect, useState, useCallback } from 'react';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';
import SpendingForm from './components/SpendingForm';
import { createSpending, getAllSpendings } from './lib/api';
import useHttp from './hooks/use-http';

export default function App() {

  const [spendings, setSpendings] = useState([]);

  const {
    sendRequest: getRequest,
    data: loadedSpendings,
    error: getSendingError,
    status: getSendingStatus
  } = useHttp(getAllSpendings, true);

  const {
    sendRequest: addRequest,
    error: createSendingError,
    status: createSendingStatus
  } = useHttp(createSpending, false);

  useEffect(() => {
    getRequest();
  }, [getRequest]);

  useEffect(() => {
    setSpendings(loadedSpendings);
  }, [loadedSpendings]);

  const newSpendingHandler = useCallback(async (spending) => {
    await addRequest(spending);
    getRequest();
  }, [addRequest, getRequest]);

  const spendingsModificationHandler = useCallback((spendingList) => {
    setSpendings([...spendingList]);
  }, []);

  return (
    <>
      <Layout>
        <SpendingForm
          onNewItem={newSpendingHandler}
          error={createSendingError}
          status={createSendingStatus}
        />
        <FiltersAndOrderings
          spendingList={spendings}
          onSpendingChange={spendingsModificationHandler}
          fullList={loadedSpendings}
        />
        <SpendingList
          data={spendings}
          errorHttp={getSendingError}
          status={getSendingStatus}
        />
      </Layout>
    </>
  );
}

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

  async function newSpendingHandler(spending) {
    await addRequest(spending);
    getRequest();
  };

  function modifiedListHandler(spendings) {
    setSpendings(spendings);
  }

  return (
    <>
      <Layout>
        <SpendingForm
          onNewItem={newSpendingHandler}
          error={createSendingError}
          status={createSendingStatus}
        />
        <FiltersAndOrderings
          onModifyingList={modifiedListHandler}
          spendingList={spendings}
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

import React from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {

  return (
    <>
      <Layout>
        <Form />
        <FiltersAndOrderings />
        <SpendingList />
      </Layout>
    </>
  );
}

const BACKEND_DOMAIN = 'http://localhost:8080';

export async function getAllSpendings() {
  const response = await fetch(`${BACKEND_DOMAIN}/spendings`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch spendings.');
  }

/*   const transformedSpendings = [];

  for (const key in data) {
    const spendingObj = {
      id: key,
      ...data[key],
    };

    transformedSpendings.push(spendingObj);
  } */

  return data;
}

export async function createSpending(spendingData) {
  const response = await fetch(`${BACKEND_DOMAIN}/spendings`, {
    method: 'POST',
    body: JSON.stringify(spendingData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not save spending.');
  }

  return null;
}




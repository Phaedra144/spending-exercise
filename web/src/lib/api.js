const BACKEND_DOMAIN = 'https://localhost:8080';

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

export const ADD_ORDER = 'ADD_ORDER';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';

export const addOrder = (cartItems, cartTotalPrice) => {
  return {
    type: ADD_ORDER,
    order: { items: cartItems, price: cartTotalPrice },
  };
};

export const submitOrder = (token, orderId, userData) => {
  return async (dispatch, getState) => {
    // Save order - address, and isCompleted=true
    await saveOrder(token, orderId, userData);
    return {
      type: SUBMIT_ORDER,
      userData: userData,
    };
  };
};

async function saveOrder(token, orderId, userData) {
  console.log(
    `[saveOrder] token=${token}, orderId=${orderId}, userData: `,
    userData,
  );
  const response = await fetch(
    `http://localhost:3000/api/orders/${orderId}?token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isCompleted: true,
        address: userData,
      }),
    },
  );

  if (!response.ok) {
    const errorResponceData = await response.json();
    console.log('[saveOrder]: ', errorResponceData);
    throw new Error('Was not able to complete the order!');
  }

  const responseData = await response.json();
  console.log('[saveOrder] responseData=', responseData);
}

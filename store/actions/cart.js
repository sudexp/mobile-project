export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (item, token) => {
  console.log(
    `[addToCart] starting to dispatch... token=${token}, item: `,
    item,
  );

  return async (dispatch, getState) => {
    // 1. If no state.orderId then create an order (POST /orders -> orderId). Put orderId to state.
    // 2. Add item to cart and save on server (POST /order/{orderId}/orderitems -> orderItemId).
    let orderId = getState().orderId;

    if (!orderId) {
      // create a new order
      orderId = await createOrder(token);
      console.log(`[addToCart] a new order created ${orderId}`);
    } else {
      console.log(`[addToCart] existing order ${orderId}`);
    }

    // save item:
    console.log('[addToCart] item', item);
    const response = await fetch(
      `http://localhost:3000/api/orders/${orderId}/items?token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item._id,
          orderId,
        }),
      },
    );

    if (!response.ok) {
      const errorResponceData = await response.json();
      console.log('[errorResponceData]: ', errorResponceData);
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();

    console.log('[addToCart] responseData', responseData);
    console.log(`[addToCart] saved orderItemId: ${responseData.data._id}`);

    return dispatch({
      type: ADD_TO_CART,
      item,
      orderId,
    });
  };
};

export const removeFromCart = itemId => {
  return {
    type: REMOVE_FROM_CART,
    itemId: itemId,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

async function createOrder(token) {
  const response = await fetch(
    `http://localhost:3000/api/orders?token=${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    },
  );

  if (!response.ok) {
    const errorResponceData = await response.json();
    console.log('[errorResponceData]: ', errorResponceData);
    throw new Error('Was not able to create a new order!');
  }

  const responseData = await response.json();
  console.log('[createOrder] responseData=', responseData);
  console.log(`[createOrder] orderId=${responseData.data._id}`);

  return responseData.data._id;
}

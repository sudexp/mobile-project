export const FETCH_ITEMS = 'FETCH_ITEMS';

export const fetchItems = () => async dispatch => {
  try {
    const response = await fetch('http://localhost:3000/api/collection');

    if (!response.ok) {
      const errorResponceData = await response.json();
      console.log('[errorResponceData]: ', errorResponceData);
      // console.log('[responseData.message]: ', responseData.message);

      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();
    // console.log('[responseData]: ', responseData);

    dispatch({
      type: FETCH_ITEMS,
      items: responseData.data,
    });
  } catch (err) {
    throw err;
  }
};

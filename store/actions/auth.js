export const ADD_USER = 'ADD_USER';

/* export const addUser = user => {
  return {
    type: ADD_USER,
    user: user,
  };
}; */

export const addUser = (email, password) => async dispatch => {
  // console.log('[email]: ', email, '[password]: ', password);
  const response = await fetch('http://localhost:3000/api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorResponceData = await response.json();
    console.log('[errorResponceData]: ', errorResponceData);
    // console.log('[responseData.message]: ', responseData.message);

    let message = 'Something went wrong!';

    if (responseData.message === 'Invalid credentials!') {
      message = 'Wrong email or password!';
    }
    throw new Error(message);
  }

  const responseData = await response.json();
  // console.log('[responseData]: ', responseData);
  // console.log('[token]: ', responseData.data.token);

  dispatch({
    type: ADD_USER,
    user: {
      email: email,
      password: password,
      token: responseData.data.token,
    },
  });
};

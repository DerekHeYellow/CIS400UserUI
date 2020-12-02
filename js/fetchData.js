const SERVICE = 'http://localhost:8080/v1/api/';

/**
 * Create a new user
 *
 * @param {String} username
 * @param {String} password
 */
async function signupUser(username, password) {
  const response = await fetch(`${SERVICE}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      usertype: 'CUSTOMER'
    }),
  });
  if (response.status === '200') {
    return 'Success.';
  } else if (response.status === '409') {
    return 'User already exists.';
  } 
  return 'Error';
}

export {
    signupUser,
}
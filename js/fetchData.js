const SERVICE = 'http://localhost:8080/v1/api/';

/**
 * Create a new user
 *
 * @param {String} username
 * @param {String} password
 * @param {String} usertype

 */
async function signupUser(username, password, usertype) {
  const response = await fetch(`${SERVICE}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      usertype
    }),
  });
  if (response.status === 200) {
    return 'Success.';
  } else if (response.status === 409) {
    return 'User already exists.';
  } 
  return 'Error';
}

/**
 * Logs in user
 *
 * @param {String} username
 * @param {String} password
 */
async function loginUser(username, password) {
  const response = await fetch(`${SERVICE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    }),
  });
  if (response.status === 200) {
    return 'Success.';
  } 
  //add more errors
  return 'Error';
}

export {
    signupUser,
    loginUser,
}
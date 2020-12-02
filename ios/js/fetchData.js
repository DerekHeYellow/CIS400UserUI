const service = '';

/**
 * Create a new user
 *
 * @param {String} username
 * @param {String} password
 */
async function signup(username, password) {
  const response = await fetch(`${URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return response.json();
}

/**
 * Get the user
 *
 * @param {String} username
 */
async function login(username) {
  const response = await fetch(`${URL}/user/${username}`);
  return response.json();
}

export {
    signup,
    login
}
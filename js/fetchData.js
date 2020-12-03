import { Status } from './enums';

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
      usertype,
    }),
  });
  if (response.status === 200) {
    return Status.SUCCESS;
  }
  if (response.status === 409) {
    return Status.ERROR.USER_ALREADY_EXISTS_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
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
      password,
    }),
  });
  if (response.status === 200) {
    return Status.ERROR.NO_ERROR;
  }
  // add more errors
  return Status.ERROR.OTHER_ERROR;
}

export {
  signupUser,
  loginUser,
};

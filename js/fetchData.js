import { Status, HttpStatus, Api } from './enums';

/**
 * Create a new user
 *
 * @param {String} username
 * @param {String} password
 * @param {String} usertype

 */
async function signupUser(username, password, email, usertype) {
  const response = await fetch(`${Api.DOMAIN}/accounts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      email,
      usertype,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  if (response.status === HttpStatus.CONFLICT) {
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
  const response = await fetch(`${Api.DOMAIN}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  if (response.status === HttpStatus.UNAUTHORIZED) {
    return Status.ERROR.LOGIN_PASSWORD_ERROR;
  }
  if (response.status === HttpStatus.NOT_FOUND) {
    return Status.ERROR.USERNAME_NOT_EXIST_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Reset the password of a user.
 *
 * @param {String} username
 * @param {String} password
 */
async function resetPassword(username, newPassword) {
  const response = await fetch(`${Api.DOMAIN}/accounts/${username}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newPassword,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  if (response.status === HttpStatus.NOT_FOUND) {
    return Status.ERROR.USERNAME_NOT_EXIST_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Create or update user profile
 *
 * @param {String} username
 */
async function putCustomerProfile(username, info) {
  const response = await fetch(`${Api.DOMAIN}/customerProfiles/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: info.firstName,
      lastName: info.lastName,
      phoneNumber: info.phoneNumber,
      picture: info.picture,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Gets user profile
 *
 * @param {String} username
 */
async function getCustomerProfile(username) {
  const response = await fetch(`${Api.DOMAIN}/customerProfiles/${username}`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  if (response.status === HttpStatus.NOT_FOUND) {
    return Status.ERROR.USER_NOT_EXIST_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

export {
  signupUser,
  loginUser,
  resetPassword,
  putCustomerProfile,
  getCustomerProfile,
};

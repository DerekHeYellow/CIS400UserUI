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
 * Gets customer profile
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
    return Status.ERROR.USER_PROFILE_NOT_EXIST_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Create or update customer profile
 *
 * @param {String} username
 */
async function putCustomerProfile(username, info) {
  const response = await fetch(`${Api.DOMAIN}/customerProfiles/${username}`, {
    method: 'PUT',
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
 * Get all businessProfiles
 */
async function getAllBusinessProfiles() {
  const response = await fetch(`${Api.DOMAIN}/businessProfiles`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Gets a business profile by username.
 *
 * @param {String} usrname
 */
async function getBusinessProfile(usrname) {
  const response = await fetch(`${Api.DOMAIN}/businessProfiles/${usrname}`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  if (response.status === HttpStatus.NOT_FOUND) {
    return Status.ERROR.BUSINESS_PROFILE_NOT_EXISTS_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Creates or a updates a business profile
 *
 * @param {String} username
 * @param {String} password
 */
async function putBusinessProfile(username, info) {
  const response = await fetch(`${Api.DOMAIN}/businessProfiles/${username}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      businessName: info.businessName,
      latitude: info.latitude,
      longitude: info.longitude,
      addressNumber: info.addressNumber,
      addressStreet: info.addressStreet,
      addressCity: info.addressCity,
      addressState: info.addressState,
      addressZIP: info.addressZIP,
      description: info.description,
      phoneNumber: info.phoneNumber,
      businessEmail: info.businessEmail,
      businessHours: info.businessHours,
      picture: info.picture,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Create a user post
 *
 * @param {String} username
 */
async function createPost(post) {
  const response = await fetch(`${Api.DOMAIN}/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: post.username,
      post: post.post,
      businessMentions: post.businessMentions,
      isFlagged: post.isFlagged,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  if (response.status === HttpStatus.CONFLICT) {
    return Status.ERROR.POST_CREATION_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Get all posts
 */
async function getAllPosts() {
  const response = await fetch(`${Api.DOMAIN}/posts`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Get all posts by a user
 */
async function getPostsByUser(username) {
  const response = await fetch(`${Api.DOMAIN}/posts/?byUser=${username}`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Get all posts that mentions a certain business
 */
async function getPostsByBusiness(businessUsername) {
  const response = await fetch(`${Api.DOMAIN}/posts/?byBusiness=${businessUsername}`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Delete post by id
 */
async function deletePostById(postId) {
  const response = await fetch(`${Api.DOMAIN}/posts/${postId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  if (response.status === HttpStatus.NOT_FOUND) {
    return Status.ERROR.POST_DELETION_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

export {
  signupUser,
  loginUser,
  resetPassword,
  getAllBusinessProfiles,
  getCustomerProfile,
  putCustomerProfile,
  getBusinessProfile,
  putBusinessProfile,
  createPost,
  getAllPosts,
  getPostsByUser,
  getPostsByBusiness,
  deletePostById,
};

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
 * Get all customerProfiles
 */
async function getAllCustomerProfiles() {
  const response = await fetch(`${Api.DOMAIN}/customerProfiles`);
  if (response.ok) {
    const json = await response.json();
    return json;
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
 * Gets menus by username
 *
 * @param {String} username
 */
async function getMenus(username) {
  const response = await fetch(`${Api.DOMAIN}/menu/${username}`);
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
 * Gets a specific menu by username and menu
 *
 * @param {String} usrname
 */
async function getMenu(username, menu) {
  const response = await fetch(`${Api.DOMAIN}/menu/${username}/${menu}`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Adds menu for a user
 *
 * @param {String} username
 * @param {String} menu
 */
async function addMenu(username, menu) {
  const response = await fetch(`${Api.DOMAIN}/menu/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newMenu : menu,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  if (response.status === HttpStatus.CONFLICT) {
    return Status.ERROR.MENU_EXISTS_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Changes menu name for a user
 *
 * @param {String} username
 * @param {String} prevMenu
 * @param {String} newMenu
 */
async function changeMenuName(username, prevMenu, newMenu) {
  const response = await fetch(`${Api.DOMAIN}/menu/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      previousMenu : prevMenu,
      newMenu : newMenu,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  if (response.status === HttpStatus.CONFLICT) {
    return Status.ERROR.MENU_EXISTS_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Deletes menu for a user
 *
 * @param {String} username
 * @param {String} menu
 */
async function deleteMenu(username, menu) {
  const response = await fetch(`${Api.DOMAIN}/menu/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      previousMenu : menu
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Adds menu section for a user and menu
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} section
 */
async function addMenuSection(username, menu, section) {
  const response =  await fetch(`${Api.DOMAIN}/menu/section/${username}/${menu}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newSection : section
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Changes menu section name for a user and menu
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} prevSection
 * @param {String} newSection
*/
async function changeMenuSection(username, menu, prevSection, newSection) {
  const response =  await fetch(`${Api.DOMAIN}/menu/section/${username}/${menu}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      previousSection : prevSection,
      newSection : newSection
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Deletes menu section for a user and menu
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} section
 */
async function deleteMenuSection(username, menu, section) {
  const response =  await fetch(`${Api.DOMAIN}/menu/section/${username}/${menu}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      previousSection : section
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Changes menu section order for a user and menu
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} section
 * @param {int} order
 */
async function changeSectionOrder(username, menu, section, order) {
  const response =  await fetch(`${Api.DOMAIN}/menu/sectionOrder/${username}/${menu}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      section : section,
      order : order
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Changes menu item order for a user and menu
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} item
 * @param {int} order
 */
async function changeItemOrder(username, menu, item, order) {
  const response =  await fetch(`${Api.DOMAIN}/menu/itemOrderAndSection/${username}/${menu}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item : item,
      order : order
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Changes menu item section for a user and menu
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} item
 * @param {String} section
 */
async function changeItemSection(username, menu, item, section) {
  const response =  await fetch(`${Api.DOMAIN}/menu/itemOrderAndSection/${username}/${menu}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item : item,
      section : section,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Adds menu item for a user and menu
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} item
 */
async function addMenuItem(username, menu, item, price, description) {
  const response =  await fetch(`${Api.DOMAIN}/menu/item/${username}/${menu}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newItem : item,
      price : price,
      description : description,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Adds menu item for a user and menu
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} item
 */
async function changeMenuItem(username, menu, oldItem, newItem, price, description, available) {
  const response =  await fetch(`${Api.DOMAIN}/menu/item/${username}/${menu}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      previousItem : oldItem,
      newItem : newItem,
      price : price,
      description : description,
      available : available,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Deletes menu item for a user and menu
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} item
 */
async function deleteMenuItem(username, menu, item) {
  const response =  await fetch(`${Api.DOMAIN}/menu/item/${username}/${menu}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      previousItem : item,
    }),
  });
  if (response.ok) {
    return Status.SUCCESS;
  }
  return Status.ERROR.OTHER_ERROR;
}

/**
 * Sends image url for uploaded item
 *
 * @param {String} username
 * @param {String} menu
 * @param {String} item
 */
async function imageForItem(username, menu, item, url) {
  const response =  await fetch(`${Api.DOMAIN}/menu/item/${username}/${menu}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newItem : item,
      picture : url,
    }),
  });
  console.log(url);
  if (response.ok) {
    return Status.SUCCESS;
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
  if (response.status === HttpStatus.NOT_FOUND) {
    return Status.ERROR.BUSINESS_PROFILE_NOT_EXISTS_ERROR;
  }
  return Status.ERROR.OTHER_ERROR;
}

export {
  signupUser,
  loginUser,
  resetPassword,
  getAllCustomerProfiles,
  getCustomerProfile,
  putCustomerProfile,
  getAllBusinessProfiles,
  getBusinessProfile,
  putBusinessProfile,
  createPost,
  getAllPosts,
  getPostsByUser,
  getPostsByBusiness,
  deletePostById,
  getMenus,
  getMenu,
  addMenu,
  changeMenuName,
  deleteMenu,
  addMenuSection,
  addMenuItem,
  deleteMenuItem,
  changeMenuItem,
  changeMenuSection,
  deleteMenuSection,
  changeSectionOrder,
  changeItemOrder,
  changeItemSection,
  imageForItem,
};

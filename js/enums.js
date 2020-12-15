const Status = Object.freeze({
  ERROR: {
    USERNAME_IS_EMPTY_ERROR: 'Please fill out this field.',
    USERNAME_NOT_ALPHANUM_ERROR: 'Username must only contain alphanumeric characters.',
    USER_ALREADY_EXISTS_ERROR: 'Sorry, an account with this username already exists.',
    EMAIL_IS_EMPTY_ERROR: 'Please fill out this field.',
    EMAIL_NOT_PROPER_FORMATE_ERROR: 'Email must be proper format',
    PASSWORD_IS_EMPTY_ERROR: 'Please fill out this field.',
    PASSWORD_LENGTH_ERROR: 'Password length is too short. Must be at least 5 characters.',
    CONFIRM_PASSWORD_ERROR: 'Passwords do not match.',
    LOGIN_ERROR: 'Sorry, the username or password doesn\'t match. Please try again.',
    OTHER_ERROR: 'Oops! Something went wrong.',
  },
  SUCCESS: 'Success.',
});

const UserType = Object.freeze({
  CUSTOMER: 'Customer',
  BUSINESS: 'Business',
});

const Api = Object.freeze({
  SERVICE: 'http://localhost:8080/v1/api/',
});

export {
  Status, UserType, Api,
};

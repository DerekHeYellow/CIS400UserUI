import AsyncStorage from '@react-native-async-storage/async-storage';
import { Status } from './enums';

const storeUsername = async (value) => {
  try {
    await AsyncStorage.setItem('@username', value);
    return Status.SUCCESS;
  } catch (e) {
    return Status.ERROR.ASYNC_STORAGE_SET_ERROR;
  }
};

const storeEmail = async (value) => {
  try {
    await AsyncStorage.setItem('@email', value);
    return Status.SUCCESS;
  } catch (e) {
    return Status.ERROR.ASYNC_STORAGE_SET_ERROR;
  }
};

const storeType = async (value) => {
  try {
    await AsyncStorage.setItem('@type', value);
    return Status.SUCCESS;
  } catch (e) {
    return Status.ERROR.ASYNC_STORAGE_SET_ERROR;
  }
};

const getUsername = async () => {
  try {
    const value = await AsyncStorage.getItem('@username');
    return value;
  } catch (e) {
    return Status.ERROR.ASYNC_STORAGE_GET_ERROR;
  }
};

const getEmail = async () => {
  try {
    const value = await AsyncStorage.getItem('@email');
    return value;
  } catch (e) {
    return Status.ERROR.ASYNC_STORAGE_GET_ERROR;
  }
};

const getType = async () => {
  try {
    const value = await AsyncStorage.getItem('@type');
    return value;
  } catch (e) {
    return Status.ERROR.ASYNC_STORAGE_GET_ERROR;
  }
};

export {
  storeUsername,
  storeEmail,
  storeType,
  getUsername,
  getEmail,
  getType,
};

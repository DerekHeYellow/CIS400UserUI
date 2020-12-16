import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard,
} from 'react-native';

import Alert from '../components/Alert';

import { Status } from '../js/enums';
import { resetPassword } from '../js/fetchData';

const ResetPassword = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // errors
  const [unError, setUnError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [confirmPwdError, setConfirmPwdError] = useState('');
  const [showResetError, setShowResetError] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [resetErrorMsg, setResetErrorMsg] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  useEffect(() => {
    let timer;
    if (showResetSuccess) {
      timer = setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [showResetSuccess]);

  const validateData = (usr, pwd, checkPwd) => {
    // validate username
    let error = false;
    if (!usr) {
      setUnError(Status.ERROR.USERNAME_IS_EMPTY_ERROR);
      error = true;
    }
    // validate password
    if (!pwd) {
      setPwdError(Status.ERROR.PASSWORD_IS_EMPTY_ERROR);
      error = true;
    } else if (pwd.length < 5) {
      setPwdError(Status.ERROR.PASSWORD_LENGTH_ERROR);
      error = true;
    } else if (checkPwd !== pwd) {
      setConfirmPwdError(Status.ERROR.CONFIRM_PASSWORD_ERROR);
      error = true;
    }
    return !error;
  };

  const handleReset = () => {
    // reset errors
    setUnError('');
    setPwdError('');
    setConfirmPwdError('');
    setShowResetError(false);

    const isValid = validateData(username, password, confirmPassword);
    if (isValid) {
      resetPassword(username, password).then((response) => {
        if (response === Status.SUCCESS) {
          setResetSuccessMsg('Your password has been reset successfully!');
          setShowResetSuccess(true);
        } else {
          setShowResetError(true);
          setResetErrorMsg(response);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <View style={styles.alertPopups}>
        <Alert
          variant="error"
          show={showResetError}
          msg={resetErrorMsg}
          onClose={() => setShowResetError(false)}
          dismissable
        />
        <Alert
          show={showResetSuccess}
          msg={resetSuccessMsg}
          variant="success"
        />
      </View>

      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            placeholder="Username"
            placeholderTextColor="#2B2D42"
            underlineColorAndroid="transparent"
            onChangeText={(usr) => setUsername(usr)}
          />
        </View>
        <Text style={styles.errorText}>
          {unError}
        </Text>
      </View>

      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="New Password"
            placeholderTextColor="#2B2D42"
            secureTextEntry
            underlineColorAndroid="transparent"
            onChangeText={(pwd) => setPassword(pwd)}
            blurOnSubmit={false}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        <Text style={styles.errorText}>
          {pwdError}
        </Text>
      </View>

      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Confirm New Password"
            placeholderTextColor="#2B2D42"
            secureTextEntry
            underlineColorAndroid="transparent"
            onChangeText={(confirmPwd) => setConfirmPassword(confirmPwd)}
            blurOnSubmit={false}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        <Text style={styles.errorText}>
          {confirmPwdError}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.resetBtn}
        onPress={handleReset}
      >
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

ResetPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ResetPassword;

const styles = StyleSheet.create({
  alertPopups: {
    width: '75%',
  },
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#ffffff',
    marginBottom: 40,
  },
  labelView: {
    width: '75%',
    marginBottom: 8,
  },
  inputView: {
    backgroundColor: '#595d88',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2,
  },
  inputText: {
    height: 45,
    color: 'white',
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
    paddingHorizontal: 2,
  },
  resetBtn: {
    width: '75%',
    backgroundColor: '#8d99ae',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  resetText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

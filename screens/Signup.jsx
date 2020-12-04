import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Switch, View, Text, TextInput, TouchableOpacity,
} from 'react-native';

import ErrorPopup from '../components/ErrorPopup';
import { Status, UserType } from '../js/enums';
import { signupUser } from '../js/fetchData';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
  const [userType, setUserType] = useState(UserType.CUSTOMER);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [unError, setUNError] = useState('');
  const [pwError, setPWError] = useState('');
  const [cpwError, setCPWError] = useState('');
  const [signupErrorShow, setSignupErrorShow] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleUsername = (un) => {
    setUsername(un);
    setUNError('');
  };

  const handlePassword = (pw) => {
    setPassword(pw);
    setPWError('');
  };

  const handleConfirmPassword = (cpw) => {
    setConfirmPassword(cpw);
    setCPWError('');
  };

  const toggleSwitch = () => {
    if (isBusiness) {
      setUserType(UserType.CUSTOMER);
    } else {
      setUserType(UserType.BUSINESS);
    }
    setIsBusiness((previousState) => !previousState);
  };

  /**
   * Returns true if data is valid, else false
   *
   * @param {string} usr
   * @param {string} pwd
   * @param {string} checkPwd
   */
  const validateData = (usr, pwd, checkPwd) => {
    // validate password
    let error = false;
    if (!usr) {
      setUNError(Status.ERROR.USERNAME_IS_EMPTY_ERROR);
      error = true;
    } else if (!(usr.toString().match(/^[0-9a-zA-Z]+$/))) {
      setUNError(Status.ERROR.USERNAME_NOT_ALPHANUM_ERROR);
      error = true;
    }
    // validate password
    if (!pwd) {
      setPWError(Status.ERROR.PASSWORD_IS_EMPTY_ERROR);
      error = true;
    } else if (pwd.length < 5) {
      setPWError(Status.ERROR.PASSWORD_LENGTH_ERROR);
      error = true;
    } else if (checkPwd !== pwd) {
      setCPWError(Status.ERROR.CONFIRM_PASSWORD_ERROR);
      error = true;
    }
    return !error;
  };

  const handleSignup = () => {
    // reset errors
    setUNError('');
    setPWError('');
    setCPWError('');
    setSignupErrorShow(false);

    const isValid = validateData(username, password, confirmPassword);
    if (isValid) {
      signupUser(username, password, userType).then((response) => {
        if (response === Status.SUCCESS) {
          navigation.navigate('Login');
        } else {
          setSignupErrorShow(true);
          setSignupError(response);
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up now.</Text>

      <ErrorPopup
        show={signupErrorShow}
        error={signupError}
        onClose={() => setSignupErrorShow(false)}
      />

      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            textContentType="username"
            autoCapitalize="none"
            placeholder="Username"
            placeholderTextColor="#2b2d42"
            underlineColorAndroid="transparent"
            onChangeText={handleUsername}
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
            textContentType="password"
            placeholder="Password"
            placeholderTextColor="#2b2d42"
            secureTextEntry
            underlineColorAndroid="transparent"
            onChangeText={handlePassword}
          />
        </View>
        <Text style={styles.errorText}>
          {pwError}
        </Text>
      </View>

      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#2b2d42"
            secureTextEntry
            underlineColorAndroid="transparent"
            onChangeText={handleConfirmPassword}
          />
        </View>
        <Text style={styles.errorText}>
          {cpwError}
        </Text>
      </View>

      <View style={styles.toggleView}>
        <Switch
          style={styles.toggleButton}
          ios_backgroundColor="#595d88"
          trackColor={{ true: '#595d88', false: '#595d88' }}
          onValueChange={toggleSwitch}
          value={isBusiness}
        />
        <Text style={styles.toggleText}>
          {userType}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.signupBtn}
        onPress={handleSignup}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

    </View>
  );
};

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2d42',
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
  toggleView: {
    width: '75%',
    height: 42,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#595d88',
  },
  toggleText: {
    height: 35,
    color: 'white',
    padding: 5,
  },
  signupBtn: {
    width: '75%',
    backgroundColor: '#ef233c',
    borderRadius: 25,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

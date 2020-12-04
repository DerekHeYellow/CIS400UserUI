import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
} from 'react-native';

import ErrorPopup from '../components/ErrorPopup';
import { Status } from '../js/enums';
import { loginUser } from '../js/fetchData';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [unError, setUnError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginErrorShow, setLoginErrorShow] = useState(false);

  const validateInputs = (usrn, pwd) => {
    let error = false;
    if (!usrn) {
      setUnError(Status.ERROR.USERNAME_IS_EMPTY_ERROR);
      error = true;
    }
    if (!pwd) {
      setPwdError(Status.ERROR.PASSWORD_IS_EMPTY_ERROR);
      error = true;
    }
    return !error;
  };
  const handleLogin = () => {
    // reset errors
    setUnError('');
    setPwdError('');
    setLoginErrorShow(false);

    const isValid = validateInputs(username, password);
    if (isValid) {
      loginUser(username, password).then((response) => {
        if (response === Status.SUCCESS) {
          navigation.navigate('Home',
            { name: '', username });
        } else {
          setLoginErrorShow(true);
          setLoginError(response);
        }
      });
    }
  };

  const handleUsernameChange = (usrn) => {
    setUsername(usrn);
    setUnError('');
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    setPwdError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Vicinity</Text>
      <ErrorPopup
        show={loginErrorShow}
        error={loginError}
        onClose={() => setLoginErrorShow(false)}
      />
      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            autoCapitalize="none"
            placeholderTextColor="#2B2D42"
            onChangeText={handleUsernameChange}
          />
        </View>
        <Text style={styles.errorText}>
          {unError}
        </Text>
      </View>
      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#2B2D42"
            onChangeText={handlePasswordChange}
          />

        </View>
        <Text style={styles.errorText}>
          {pwdError}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('ResetPassword')}
      >
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
    paddingHorizontal: 2,
  },
  labelView: {
    width: '65%',
    marginBottom: 8,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#FFFFFF',
    marginBottom: 40,
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
  forgot: {
    color: 'gray',
    fontSize: 11,
  },
  loginBtn: {
    width: '65%',
    backgroundColor: '#ef233c',
    borderRadius: 25,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupBtn: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useState } from 'react';
import { StyleSheet, Switch, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { signupUser } from '../js/fetchData';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
  const [userType, setUserType] = useState('Customer');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [unError, setUNError] = useState('');
  const [pwError, setPWError] = useState('');
  const [cpwError, setCPWError] = useState('');


  const handleUsername = (un) => {
    setUsername(un);
    if (un.length < 1) {
      setUNError("Username cannot be empty")
    } else {
      setUNError('')
    }
  }

  const handlePassword = (pw) => {
    setPassword(pw);
    if (pw.length < 5) {
      setPWError("Password must be at least 5 characters")
    } else {
      setPWError('')
    }
  }

  const handleConfirmPassword = (cpw) => {
    setConfirmPassword(cpw);
    if (cpw !== password) {
      setCPWError("Passwords must match")
    } else {
      setCPWError('')
    }
  }

  const toggleSwitch = () => {
    if (isBusiness) {
      setUserType("Customer")
    } else {
      setUserType("Business")
    }
    setIsBusiness(previousState => !previousState);
  }

  const validateData = (usr, pwd) => {
    // check if username is valid 
    if (!(usr.toString().match(/^[0-9a-zA-Z]+$/))) {
      return 'Username must only contain alphanumeric characters!';
    }
    // check if password is valid
    if (pwd.length < 5) {
      return 'Password length is too short! Must be at least 5 characters.';
    }
    return "Success";
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      // add an alert?
      console.log("passwords don't match!");
    }
    const status = validateData(username, password)
    if (status === "Success") {
      signupUser(username, password, userType).then((response) => {
        if (response === 'User already exists.') {
          console.log('User already exists.');
          //show some error handling
        } else if (response === 'Success.') {
          console.log('success');
          navigation.navigate('Login');
        } else {
          console.log(response)
        }
      });
    } else {
      console.log("Error: ", status);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up now.</Text>

      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#2b2d42"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            onChangeText={(username) => handleUsername(username)} />
        </View>
        <Text style={styles.errorText}>
          {unError}
        </Text>
      </View>

      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#2b2d42"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => handlePassword(password)} />
        </View>
        <Text style={styles.errorText}>
          {pwError}
        </Text>
      </View>

      <View style={styles.labelView}>
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#2b2d42"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(confirmPassword) => handleConfirmPassword(confirmPassword)} />
        </View>
        <Text style={styles.errorText}>
          {cpwError}
        </Text>
      </View>

      <View style={styles.toggleView}>
        <Switch style={styles.toggleButton}
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
        onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

    </View>
  );
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
    fontWeight: "bold",
    fontSize: 35,
    color: "#ffffff",
    marginBottom: 40
  },
  labelView: {
    width: "75%",
    // padding: 15,
    marginBottom: 15,
    height: 50,
    paddingBottom: 15
  },
  inputView: {
    // width: "75%",
    backgroundColor: "#595d88",
    // height: 42,
    // marginBottom: 15,
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15
    // padding: 15
  },
  inputText: {
    height: 45,
    color: "white"
  },
  errorText: {
    height: 30,
    color: "red",
    textAlign: "left"
  },
  toggleView: {
    width: "75%",
    height: 42,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#595d88",
  },
  toggleText: {
    height: 35,
    color: "white",
    padding: 5
  },
  signupBtn: {
    width: "75%",
    backgroundColor: "#ef233c",
    borderRadius: 25,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10
  },
  signupText: {
    color: "white",
    fontWeight: "bold"
  }
});


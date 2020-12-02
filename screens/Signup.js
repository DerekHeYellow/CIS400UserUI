import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
// import {
//   TextField,
//   FilledTextField,
//   OutlinedTextField,
// } from 'react-native-material-textfield';

import {signupUser} from '../js/fetchData';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  fieldRef = React.createRef();

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
      // handle passwords don't match
      console.log("passwords don't match!");
    }
    const status = validateData(username, password)
    if (status === "Success") {
      console.log('success');
      navigation.navigate('Login');
    } else {
      console.log(status);
      // display status
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up now.</Text>
      
      {/* <View style={styles.inputView}>
      <OutlinedTextField
          label='Phone number'
          keyboardType='phone-pad'
          // formatText={this.formatText}
          // onSubmitEditing={this.onSubmit}
          ref={this.fieldRef}
        />
        </View> */}

        
      <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="#2b2d42"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => setUsername(username)}/>
        </View>
        
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#2b2d42"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => setEmail(email)}/>
        </View>
        
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#2b2d42"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => setPassword(password)}/>
        </View>

        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Confirm Password"
              placeholderTextColor="#2b2d42"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(confirmPassword) => setPassword(confirmPassword)}/>
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
  title:{
    fontWeight: "bold",
    fontSize: 35,
    color:"#ffffff",
    marginBottom:40
  },
  inputView:{
    width:"75%",
    backgroundColor:"#595d88",
    height:42,
    marginBottom:15,
    justifyContent:"center",
    padding:15
  },
  inputText:{
    height:45,
    color:"white"
  },
  signupBtn:{
    width:"75%",
    backgroundColor:"#ef233c",
    borderRadius:25,
    height:42,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10
  },
  signupText:{
    color:"white",
    fontWeight: "bold"
  }
});


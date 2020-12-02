import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { loginUser } from '../js/fetchData';


const Login = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');



  const handleLogin = () => {
    if(username.length == 0 || password.length == 0) {
      setLoginError('Fields cannot be blank')
      console.log("Fill out all fields")
      return;
    }
    loginUser(username, password).then((response) => {
      if (response === 'Success.') {
        console.log('success');
        navigation.navigate('Home', 
          {name:"", username: username, email: email});
      } else {
        setLoginError('Login Failed')
        //make error more specific?
        console.log(response)
      }
    });
  };

  return (
      <View style={styles.container}>
        <Text style={styles.logo}>Vicinity</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Username" 
            placeholderTextColor="#2B2D42"
            onChangeText={username => setUsername(username)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#2B2D42"
            onChangeText={password => setPassword(password)}/>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>
          {loginError}
        </Text>

  
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight: "bold",
    fontSize:50,
    color:"#FFFFFF",
    marginBottom:40
  },
  inputView:{
    width:"65%",
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
  forgot:{
    color:"gray",
    fontSize:11
  },
  loginBtn:{
    width:"65%",
    backgroundColor:"#ef233c",
    borderRadius:25,
    height:42,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontWeight: "bold"
  },
  signupBtn:{
    height:42,
    alignItems:"center",
    justifyContent:"center"
  },
  errorText:{
    height: 50,
    color: "red",
    paddingTop: 20
  },
});

export default Login;
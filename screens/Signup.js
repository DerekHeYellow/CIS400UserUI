import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Signup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="#003f5c"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(username) => setUsername({username})}/>
        </View>
        
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => setEmail({email})}/>
        </View>
        
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => setPassword({password})}/>
        </View>

        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(confirmPassword) => setPassword({confirmPassword})}/>
        </View>

        <TouchableOpacity 
          style={styles.signupBtn}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.signupText}>Sign up</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontWeight: "400",
    fontSize: 35,
    color:"#fb5b5a",
    marginBottom:40
  },

  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  signupBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  signupText:{
    color:"white"
  }
});


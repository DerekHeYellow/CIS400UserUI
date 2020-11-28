import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#2B2D42"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => setEmail({email})}/>
        </View>
        
        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="New Password"
              placeholderTextColor="#2B2D42"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => setPassword({password})}/>
        </View>

        <View style={styles.inputView}>
          <TextInput style={styles.inputText}
              placeholder="Confirm New Password"
              placeholderTextColor="#2B2D42"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(confirmPassword) => setPassword({confirmPassword})}/>
        </View>

        <TouchableOpacity 
          style={styles.resetBtn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontWeight: "bold",
    fontSize:35,
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
    height:50,
    color:"white"
  },
  resetBtn:{
    width:"75%",
    backgroundColor:"#8d99ae",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  resetText:{
    color:"white",
    fontWeight: "bold"
  }
});


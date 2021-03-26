import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Switch, View, Text, TouchableOpacity,
} from 'react-native';

import { signupUser } from '../js/fetchData';

const UserType = ({ navigation }) => {

  const handleCustomer = () => {
    navigation.navigate('Signup', { userType: 'Customer' });
  };

  const handleBusiness= () => {
    navigation.navigate('Signup', { userType: 'Business' });

  };

  return (
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.title}>
          Sign up as:
        </Text>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={handleCustomer}
        >
          <Text style={styles.signupText}>Customer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={handleBusiness}
        >
          <Text style={styles.signupText}>Business</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

UserType.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserType;

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
    marginTop: -50,
    marginBottom: 40,
    textAlign: 'center',
  },
  signupBtn: {
    backgroundColor: '#ef233c',
    borderRadius: 25,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  signupContainer: {
    width: '75%',
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

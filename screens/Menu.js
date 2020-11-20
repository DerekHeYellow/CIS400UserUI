import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


const Menu = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Menu </Text>
    </View>
  )
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "400",
    fontSize: 35,
    color:"#fb5b5a",
    marginBottom:40,
  }
});

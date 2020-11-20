
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


const Home = ({ route, navigation }) => {
  const { name, username, email } = route.params;
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to Vici.</Text>
        <TouchableOpacity
          style={styles.pageBtn}
          onPress={() => navigation.navigate('ListBusiness')}>
          <Text style={styles.pageText}>Businesses</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.pageBtn}
          onPress={() => navigation.navigate('ListContacts')}>
          <Text style={styles.pageText}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.pageBtn}
          onPress={() => navigation.navigate('Map')}>
          <Text style={styles.pageText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.pageBtn}
          onPress={() => navigation.navigate('UserProfile', 
          {name: 'Rosa Sun',
          avatar_url: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          username: 'rosasun',
          email:'rosasun@gmail.com'})}>
          <Text style={styles.pageText}>My Profile</Text>
        </TouchableOpacity>
      </View>
  )
}


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    color:"white",
    marginBottom:40,
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
  pageBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    height:60,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
  },
  pageText:{
    color:"white",
    fontSize:20
  }
});


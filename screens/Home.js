import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'


const Home = ({ route, navigation }) => {
  const { name, username, email } = route.params;
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to Vici.</Text>
        <View style={styles.buttonLayout}>
          <TouchableOpacity
            style={styles.pageBtn}
            onPress={() => navigation.navigate('ListBusiness')}>
            <Icon name="shopping-basket" size={50} color="green" />
            <Text style={styles.pageText}>Businesses</Text>
            </TouchableOpacity>
          <TouchableOpacity 
            style={styles.pageBtn}
            onPress={() => navigation.navigate('Map')}>
            <Icon name="map" size={50} color="#EF233C" />
            <Text style={styles.pageText}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.pageBtn}
            onPress={() => navigation.navigate('ListContacts')}>
            <Icon name="contacts" size={40} color="gray" />
            <Text style={styles.pageText}>Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.pageBtn}
            onPress={() => navigation.navigate('UserProfile', 
            {name: 'Rosa Sun',
            avatar_url: 'https://bootdey.com/img/Content/avatar/avatar3.png',
            username: 'rosasun',
            email:'rosasun@gmail.com'})}>
            <Icon name="person" size={50} color="#2b2d42" />
            <Text style={styles.pageText}>My Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
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
    width:"35%",
    backgroundColor:"#EDF2F4",
    height:135,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginRight:10,
    marginLeft:10
  },
  pageText:{
    color:"#2B2D42",
    fontSize:20,
    fontWeight:"bold"
  },
  buttonLayout:{
    width:"100%",
    flexDirection:"row",
    flexWrap:"wrap",
    alignItems:"center",
    justifyContent:"center"
  }
});


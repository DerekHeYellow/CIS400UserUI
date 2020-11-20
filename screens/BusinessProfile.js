import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

const BusinessProfile = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Magic Carpet</Text>
              <Text style={styles.info}>Middle Eastern Food Truck</Text>
              <Text style={styles.description}>Wholesome yummy food that everyone can enjoy! Stop by today!</Text>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Our Location</Text>
                  <Text style={styles.cardInfo}>3900 Walnut Street, Philadelphia PA, USA</Text>
                </View>
              <View style={styles.card}>
                  <Text style={styles.cardTitle}>Business Email</Text>
                  <Text style={styles.cardInfo}>magiccarpetride@gmail.com</Text>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Business Phone</Text>
                  <Text style={styles.cardInfo}>(271) 111-1234</Text>
                </View>

              <TouchableOpacity style={styles.buttonContainer}>
                <Text style = {styles.buttonText}>Menus</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                  <Text style = {styles.buttonText}>Reviews</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>



      </View>
    );
}

export default BusinessProfile;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#fb5b5a",
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:80
  },
  name:{
    fontWeight:'bold',
    fontSize:22,
    color:"#FFFFFF",
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center',
    marginBottom:20,
  },
  buttonContainer: {
    marginTop:20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:250,
    borderRadius:30,
    backgroundColor: "#fb5b5a",
  },
  buttonText:{
    color:"white"
  },
  cardTitle:{
      color:"#808080",
      fontSize:16,
      marginBottom:5,
    },
    card:{
      backgroundColor: "#FFFFFF",
      padding:10,
      height:60,
      width:350,
      marginTop:5,
    },
    cardInfo:{
      fontSize:13,
    }
});
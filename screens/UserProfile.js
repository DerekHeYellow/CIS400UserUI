import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

const UserProfile = ({ route, navigation }) => {
  const { name, avatar_url, username, email } = route.params;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: avatar_url}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.description}>This is my bio. I tell you a little about myself here.</Text>

              <View style={styles.card}>
                  <Text style={styles.cardTitle}>Email</Text>
                  <Text style={styles.cardInfo}>{email}</Text>
                </View>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Phone</Text>
                  <Text style={styles.cardInfo}>(493)594-3920</Text>
                </View>

               <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => navigation.navigate('UserPosts')}>
                   <Text style = {styles.buttonText}>My Posts</Text>
               </TouchableOpacity>

              <TouchableOpacity style={styles.buttonContainer}
              onPress={() => navigation.navigate('EditUserProfile', 
              {name: name, avatar_url: avatar_url, username: username, email: email})}>
                <Text style = {styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.pageText}>Log Out</Text>
              </TouchableOpacity>
            </View>

        </View>


        </ScrollView>
      </View>
    );
}

export default UserProfile;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#003f5c",
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
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
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
  username:{
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
    marginBottom:10,
    width:250,
    borderRadius:30,
    backgroundColor: "#fb5b5a",
  },
  buttonText:{
    color:"white"
  },
  wordBold: {
    fontWeight: 'bold',
    color: 'black'
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
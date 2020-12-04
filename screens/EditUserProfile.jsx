/* eslint-disable */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const EditUserProfile = ({ route, navigation }) => {
  const {
    name, avatar_url, username, email,
  } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header} />
        {/* <Image style={styles.avatar} source={{uri: avatar_url}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.info}>{username}</Text> */}
        <Image style={styles.avatar} source={{ uri: avatar_url }} />
        <Text style={styles.editAvatar}>Click to Edit</Text>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>First Name</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Last Name</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Bio</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Email</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Phone</Text>
              <TextInput style={styles.input} />
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('UserProfile')}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('UserProfile')}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.deleteText}>Delete Profile</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </View>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
  },
  header: {
    backgroundColor: '#2B2D42',
    height: 100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,
  },
  name: {
    fontSize: 22,
    color: '#2B2D42',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '50%',
    borderRadius: 25,
    backgroundColor: '#2B2D42',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#2B2D42',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 50,
  },
  deleteText: {
    color: '#ef233c',
    fontWeight: 'bold',
    marginTop: 10,
  },
  editAvatar: {
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    fontSize: 19,
  },
  cardTitle: {
    color: '#8d99ae',
    fontSize: 14,
    marginBottom: -10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    height: 65,
    width: '95%',
    marginBottom: 15,
  },
  cardInfo: {
    fontSize: 14,
  },
});

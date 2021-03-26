import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getUsername } from '../js/asyncStorage';
import { getCustomerProfile } from '../js/fetchData';

const UserProfile = ({ route, navigation }) => {
  const [username] = useState(route.params.username);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [picture, setPicture] = useState('');
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // check for edit permissions
      getUsername().then((currUser) => {
        if (currUser === route.params.username) {
          setCanEdit(true);
        }
      });
      getCustomerProfile(route.params.username).then((response) => {
        if (response && typeof response === 'object') {
          setEmail(response.email);
          setFirstName(response.firstName);
          setLastName(response.lastName);
          setPhoneNumber(response.phoneNumber);
          setPicture(response.picture);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  const generateInitials = () => {
    if (!firstName && !lastName) {
      return (username.charAt(0) + username.charAt(1)).toUpperCase();
    }
    if (firstName && lastName) {
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    }
    if (firstName && !lastName) {
      return (firstName.charAt(0) + firstName.charAt(1)).toUpperCase();
    }
    return (lastName.charAt(0) + lastName.charAt(1)).toUpperCase();
  };

  const getProfilePic = (pic) => {
    if (!pic) {
      return (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{generateInitials()}</Text>
        </View>
      );
    }
    return <Image style={styles.avatar} source={{ uri: pic }} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header} />
        {getProfilePic(picture)}
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
              {firstName}
              {' '}
              {lastName}
            </Text>
            <Text style={styles.username}>{username}</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Email</Text>
              <Text style={styles.cardInfo}>{email}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Phone</Text>
              <Text style={styles.cardInfo}>{phoneNumber}</Text>
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('UserPosts', { username })}
            >
              <Text style={styles.buttonText}>{canEdit ? 'My Posts' : 'See Posts'}</Text>
            </TouchableOpacity>

            {canEdit
            && (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('EditUserProfile', { email, username })}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            )}

            {canEdit
            && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.logouttext}>Log Out</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

UserProfile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
  },
  header: {
    backgroundColor: '#2B2D42',
    height: 170,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 100,
    backgroundColor: '#8d99ae',
    justifyContent: 'center',
    display: 'flex',
  },
  avatarText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 50,
  },
  name: {
    fontSize: 28,
    color: '#2B2D42',
    fontWeight: 'bold',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  username: {
    fontSize: 16,
    color: '#2B2D42',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 25,
    backgroundColor: '#2B2D42',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardTitle: {
    color: '#8d99ae',
    fontSize: 14,
  },
  logouttext: {
    marginTop: 20,
    color: '#2B2D42',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    height: 60,
    width: '95%',
    marginTop: 20,
  },
  cardInfo: {
    fontSize: 14,
  },
});

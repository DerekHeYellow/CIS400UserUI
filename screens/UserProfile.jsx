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
import { getUsername, getEmail } from '../js/asyncStorage';
import { getCustomerProfile } from '../js/fetchData';

const UserProfile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [picture, setPicture] = useState('https://bootdey.com/img/Content/avatar/avatar3.png');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUsername().then((un) => {
        if (un) {
          setUsername(un);
          getCustomerProfile(un).then((response) => {
            if (response && typeof response === 'object') {
              setFirstName(response.firstName);
              setLastName(response.lastName);
              setPhoneNumber(response.phoneNumber);
              setPicture('https://bootdey.com/img/Content/avatar/avatar3.png');
            }
          });
        }
      });
      getEmail().then((em) => {
        if (em) {
          setEmail(em);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={{ uri: picture }} />
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
              onPress={() => navigation.navigate('UserPosts')}
            >
              <Text style={styles.buttonText}>My Posts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('EditUserProfile', { email, username })}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.logouttext}>Log Out</Text>
            </TouchableOpacity>
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
      email: PropTypes.string,
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
  cardTitle: {
    color: '#8d99ae',
    fontSize: 14,
  },
  logouttext: {
    color: '#2B2D42',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    height: 60,
    width: '95%',
    marginTop: 20,
    marginBottom: 15,
  },
  cardInfo: {
    fontSize: 14,
  },
});

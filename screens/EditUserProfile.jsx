import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getUsername } from '../js/asyncStorage';
import { putCustomerProfile, getCustomerProfile } from '../js/fetchData';
import { Status } from '../js/enums';

const EditUserProfile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [picture, setPicture] = useState('https://bootdey.com/img/Content/avatar/avatar3.png');

  useEffect(() => {
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
  }, []);

  const handleSave = () => {
    const info = {
      firstName,
      lastName,
      phoneNumber,
      picture,
    };
    putCustomerProfile(username, info).then((response) => {
      if (response === Status.SUCCESS) {
        navigation.navigate('UserProfile');
      }
    });
  };

  const cancelChanges = () => {
    navigation.navigate('UserProfile');
  };

  const handleFirstNameChange = (fn) => {
    setFirstName(fn);
  };
  const handleLastNameChange = (ln) => {
    setLastName(ln);
  };

  const handlePhoneNumberChange = (pn) => {
    const numericRegex = /^([0-9]{1,100})+$/;
    if (numericRegex.test(pn)) {
      setPhoneNumber(pn);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={{ uri: picture }} />
        <Text style={styles.editAvatar}>Click to Edit</Text>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={handleFirstNameChange}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={handleLastNameChange}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Phone</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={cancelChanges}
            >
              <Text style={styles.deleteText}>Delete Profile</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </View>
  );
};

EditUserProfile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
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
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
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
  input: {
    paddingTop: 14,
    fontSize: 14,
  },
});

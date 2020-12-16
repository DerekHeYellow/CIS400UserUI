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
import { putBusinessProfile, getBusinessProfile } from '../js/fetchData';
import { Status } from '../js/enums';

const EditBusinessProfile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [addressNumber, setAddNumber] = useState(0);
  const [addressStreet, setAddStreet] = useState('');
  const [addressCity, setAddCity] = useState('');
  const [addressState, setAddState] = useState('');
  const [addressZIP, setAddZip] = useState('');

  useEffect(() => {
    getUsername().then((un) => {
      if (un) {
        setUsername(un);
        getBusinessProfile(un).then((response) => {
          if (response && typeof response === 'object') {
            setAddNumber(response.addressNumber.toString());
            setAddStreet(response.addressStreet);
            setAddCity(response.addressCity);
            setAddState(response.addressState);
            setAddZip(response.addressZIP);
            setBusinessName(response.businessName);
            setDescription(response.description);
            setPhoneNumber(response.phoneNumber);
            setBusinessHours(response.businessHours);
          }
        });
      }
    });
  }, []);

  const handleSave = () => {
    const info = {
      businessName,
      description,
      phoneNumber,
      businessHours,
      addressNumber,
      addressStreet,
      addressCity,
      addressState,
      addressZIP,
    };
    putBusinessProfile(username, info).then((response) => {
      if (response === Status.SUCCESS) {
        navigation.navigate('BusinessProfile');
      }
    });
  };

  const handleDescriptionChange = (desc) => {
    setDescription(desc);
  };
  const handleBusinessNameChange = (name) => {
    setBusinessName(name);
  };
  const handlePhoneNumberChange = (num) => {
    setPhoneNumber(num);
  };
  const handleHoursChange = (hr) => {
    setBusinessHours(hr);
  };
  const handleAddNum = (num) => {
    setAddNumber(num);
  };
  const handleAddStreet = (st) => {
    setAddStreet(st);
  };
  const handleAddCity = (city) => {
    setAddCity(city);
  };
  const handleAddState = (st) => {
    setAddState(st);
  };
  const handleAddZip = (zip) => {
    setAddZip(zip);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Business Name</Text>
              <TextInput
                style={styles.input}
                value={businessName}
                onChangeText={handleBusinessNameChange}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={handleDescriptionChange}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Hours</Text>
              <TextInput
                style={styles.input}
                value={businessHours}
                onChangeText={handleHoursChange}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Street Number</Text>
              <TextInput
                style={styles.input}
                value={addressNumber}
                onChangeText={handleAddNum}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Street</Text>
              <TextInput
                style={styles.input}
                value={addressStreet}
                onChangeText={handleAddStreet}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>City</Text>
              <TextInput
                style={styles.input}
                value={addressCity}
                onChangeText={handleAddCity}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>State</Text>
              <TextInput
                style={styles.input}
                value={addressState}
                onChangeText={handleAddState}
              />
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Zip Code</Text>
              <TextInput
                style={styles.input}
                value={addressZIP}
                onChangeText={handleAddZip}
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

EditBusinessProfile.propTypes = {
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

export default EditBusinessProfile;

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

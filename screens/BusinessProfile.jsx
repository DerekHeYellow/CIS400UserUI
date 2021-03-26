import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Alert from '../components/Alert';
import { getType } from '../js/asyncStorage';
import { UserType } from '../js/enums';

import { getBusinessProfile } from '../js/fetchData';

const BusinessProfile = ({ route, navigation }) => {
  const [businessUsername, setBusinessUsername] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({});
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [showNoProfile, setShowNoProfile] = useState(false);
  const [noProfileError, setNoProfileError] = useState('');
  const [editShow, setEditShow] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getType().then((response) => {
        if (response) {
          // setType(response);
          if (parseInt(response, 10) === UserType.BUSINESS) {
            setEditShow(true);
          } else {
            setEditShow(false);
          }
        }
      });
      getBusinessProfile(route.params.username).then((response) => {
        if (response && typeof response === 'object') {
          setBusinessUsername(route.params.username);
          setBusinessName(response.businessName);
          setDescription(response.description);
          setPhoneNumber(response.phoneNumber);
          setAddress({
            number: response.addressNumber,
            street: response.addressStreet,
            city: response.addressCity,
            state: response.addressState,
          });
          setBusinessEmail(response.businessEmail);
          setBusinessHours(response.businessHours);
        } else {
          setNoProfileError(response);
          setShowNoProfile(true);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{businessName}</Text>
            <View style={styles.alert}>
              <Alert
                show={showNoProfile}
                msg={noProfileError}
                variant="light"
                icon="sentiment-very-dissatisfied"
              />
            </View>
            { description !== null && description !== ''
            && (<Text style={styles.info}>{description}</Text>)}
            { Object.keys(address).length > 0
              && (address.number !== null
                || address.street !== null
                || address.city !== null
                || address.state !== null)
              && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Our Location</Text>
                <Text style={styles.cardInfo}>
                  {address.number}
                  {' '}
                  {address.street}
                  {' '}
                  {address.city}
                  {' '}
                  {address.state}
                </Text>
              </View>
              )}
            { businessEmail !== null && businessEmail !== ''
             && (
             <View style={styles.card}>
               <Text style={styles.cardTitle}>Business Email</Text>
               <Text style={styles.cardInfo}>{businessEmail}</Text>
             </View>
             )}
            { phoneNumber !== null && businessEmail !== ''
              && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Phone Number</Text>
                <Text style={styles.cardInfo}>{phoneNumber}</Text>
              </View>
              )}
            { businessHours !== null && businessHours !== ''
              && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Hours</Text>
                <Text style={styles.cardInfo}>{businessHours}</Text>
              </View>
              )}
            {!editShow && (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('CustomerMenus', { business: businessUsername })}
            >
              <Text style={styles.buttonText}>Menus</Text>
            </TouchableOpacity>
            )}
            {editShow && (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('BusinessMenus', { business: route.params.username })}
              >
                <Text style={styles.buttonText}>My Menus</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.buttonContainer3}
              onPress={() => navigation.navigate('BusinessMentions', { businessUsername: route.params.username })}
            >
              <Text style={styles.buttonText}>Mentions</Text>
            </TouchableOpacity>
            {editShow && (
            <TouchableOpacity
              style={styles.buttonContainer2}
              onPress={() => navigation.navigate('EditBusinessProfile')}
            >
              <Text style={styles.buttonText2}>Edit Profile</Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

BusinessProfile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    addListener: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default BusinessProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
  },
  header: {
    backgroundColor: '#2B2D42',
    height: 170,
  },
  alert: {
    width: '70%',
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
  body: {
    marginTop: 40,
    marginBottom: 50,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    color: '#2B2D42',
    fontWeight: 'bold',
    marginTop: 20,
    height: 60,
    padding: 10,
  },
  info: {
    fontSize: 16,
    color: '#8d99ae',
    height: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 30,
    backgroundColor: '#2B2D42',
  },
  buttonContainer2: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 30,
  },
  buttonContainer3: {
    marginTop: 15,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    borderRadius: 30,
    backgroundColor: '#2B2D42',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#2B2D42',
    fontWeight: 'bold',
  },
  cardTitle: {
    color: '#8d99ae',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    height: 60,
    width: 350,
    marginTop: 10,
  },
  cardInfo: {
    fontSize: 14,
    color: '#2B2D42',
  },
});

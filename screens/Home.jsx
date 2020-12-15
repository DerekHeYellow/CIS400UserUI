import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to Vici.</Text>
    <View style={styles.buttonLayout}>
      <TouchableOpacity
        style={styles.pageBtn}
        onPress={() => navigation.navigate('ListBusiness')}
      >
        <Icon name="shopping-basket" size={50} color="green" />
        <Text style={styles.pageText}>Businesses</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pageBtn}
        onPress={() => navigation.navigate('Map')}
      >
        <Icon name="map" size={50} color="#EF233C" />
        <Text style={styles.pageText}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pageBtn}
        onPress={() => navigation.navigate('ListContacts')}
      >
        <Icon name="contacts" size={40} color="gray" />
        <Text style={styles.pageText}>Contacts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pageBtn}
        onPress={() => navigation.navigate('UserProfile',
          {
            name: 'Rosa Sun',
            avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
            username: 'rosasun',
            email: 'rosasun@gmail.com',
          })}
      >
        <Icon name="person" size={50} color="#2b2d42" />
        <Text style={styles.pageText}>My Profile</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Home;

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
    marginBottom: 40,
  },
  pageBtn: {
    width: '35%',
    backgroundColor: '#EDF2F4',
    height: 135,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  pageText: {
    color: '#2B2D42',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonLayout: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

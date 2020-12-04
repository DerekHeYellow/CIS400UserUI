import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const UserProfile = ({ route, navigation }) => {
  const {
    name, avatarUrl, username, email,
  } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={{ uri: avatarUrl }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.description}>
              This is my bio. I tell you a little about myself here.
            </Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Email</Text>
              <Text style={styles.cardInfo}>{email}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Phone</Text>
              <Text style={styles.cardInfo}>(493)594-3920</Text>
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('UserPosts')}
            >
              <Text style={styles.buttonText}>My Posts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('EditUserProfile',
                {
                  name, avatarUrl, username, email,
                })}
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
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      avatarUrl: PropTypes.string,
      email: PropTypes.string,
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
  description: {
    fontSize: 16,
    color: '#8d99ae',
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
    marginBottom: 15,
  },
  cardInfo: {
    fontSize: 14,
  },
});

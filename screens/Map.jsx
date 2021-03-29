import React, {
  useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import MapView, { Callout, CalloutSubview, Marker } from 'react-native-maps';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Icon } from 'react-native-elements';
import Alert from '../components/Alert';

const Map = ({ navigation }) => {
  const [initialRegion] = useState({
    latitude: 39.955797, longitude: -75.201833, latitudeDelta: 1, longitudeDelta: 1,
  });
  const [mapRegion] = useState(null);
  const mapView = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [showError, setShowError] = useState(false);
  const [followUser, setFollowUser] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        // setMapRegion(region);
        // zoom to region
        mapView.current.animateToRegion(region, 1000);
      },
      (error) => {
        setShowError(true);
        setErrorMsg(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
    setMarkers([
      {
        username: 'kims',
        businessName: 'Kim\'s',
        description: 'Chinese Food Truck',
        latitude: 39.95647989062442,
        longitude: -75.20280216242843,
      },
      {
        username: 'tacos',
        businessName: 'Tacos Tuesday',
        description: '',
        latitude: 39.95699593854842,
        longitude: -75.20085215290271,
      },
      {
        username: 'donmemos',
        businessName: 'Don Memos',
        description: 'Mexican Food Truck',
        latitude: 39.955010659936775,
        longitude: -75.20340019635947,
      },
      {
        username: 'yuekee',
        businessName: 'Yue Kee',
        description: 'Chinese Food Truck',
        latitude: 39.95548691801169,
        longitude: -75.20143855194482,
      },
      {
        username: 'alz',
        businessName: 'Farmers Market 36 Walnut',
        description: 'Farmers Market',
        latitude: 39.953450,
        longitude: -75.194895,
      },
      {
        username: 'magiccarpet',
        businessName: 'Magic Carpet',
        description: 'Middle Eastern Food Truck',
        latitude: 39.951995,
        longitude: -75.192555,
      },
      {
        username: 'halal',
        businessName: 'Halal Food Truck',
        description: 'Halal Food Truck',
        latitude: 39.954748,
        longitude: -75.199870,
      },
    ]);
  }, []);

  const onLinkPress = (username, name) => {
    navigation.push('BusinessProfile', { username, name });
  };

  return (
    <View style={styles.mapView}>
      <MapView
        style={styles.customMapStyle}
        region={mapRegion}
        followsUserLocation={followUser}
        ref={mapView}
        zoomEnabled
        showsUserLocation
        initialRegion={initialRegion}
        loadingEnabled
        loadingIndicatorColor="white"
        loadingBackgroundColor="#2B2D42"
        onPanDrag={() => setFollowUser(false)}
        onLongPress={() => setFollowUser(false)}
      >
        { markers.map((marker) => (
          <Marker
            key={marker.username}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <TouchableOpacity
              style={styles.customMarker}
            >
              <Icon name="restaurant" size={25} color="white" style={styles.icon} />
            </TouchableOpacity>
            <Callout>
              <View style={styles.tooltip}>
                <Text style={styles.title}>
                  {marker.businessName}
                </Text>
                <Text style={styles.subTitle}>
                  {marker.description}
                </Text>
                <CalloutSubview onPress={() => onLinkPress(marker.username, marker.businessName)}>
                  <TouchableOpacity style={styles.link}>
                    <Text>See Profile</Text>
                  </TouchableOpacity>
                </CalloutSubview>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.alert}>
        <View style={styles.alertBody}>
          <Alert
            show={showError}
            msg={errorMsg}
            variant="light"
            icon="error-outline"
            dismissable
            onClose={() => setShowError(false)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.findBtn}
        onPress={() => {
          setFollowUser(true);
          getCurrentLocation();
        }}
      >
        <Icon name="my-location" size={40} color="white" />
      </TouchableOpacity>

    </View>
  );
};

Map.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};

export default Map;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  customMapStyle: {
    flex: 1,
  },
  customMarker: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: '#2B2D42',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    transform: [{ translateY: -25 }, { rotate: '45deg' }],
  },
  icon: {
    transform: [{ rotate: '-45deg' }],
  },
  tooltip: {
    flex: 1,
    width: 150,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTitle: {
    color: 'gray',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 10,
    padding: 3,
    borderColor: '#2B2D42',
    borderRadius: 5,
  },
  alert: {
    position: 'absolute',
    width: '100%',
    top: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBody: {
    width: '75%',
  },
  findBtn: {
    position: 'absolute',
    width: 80,
    height: 80,
    bottom: 80,
    right: 30,
    borderRadius: 40,
    backgroundColor: '#8d99ae',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
});

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
  const [initialRegion, setInitialRegion] = useState({});
  const [mapRegion, setMapRegion] = useState({});
  const mapView = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [showError, setShowError] = useState(false);
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
        // zoom to region
        setInitialRegion(region);
        mapView.current.animateToRegion(region, 1000);
        // delete this if we want to have a zoom effect
        setMapRegion(region);
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
    setMarkers([
      {
        username: 'kims',
        businessName: 'Kim\'s',
        description: 'Chinese Food Truck',
        latitude: 39.95647989062442,
        longitude: -75.20280216242843,
      },
      {
        username: 'magiccarpet',
        businessName: 'Magic Carpet',
        description: 'Middle Eastern Food Truck',
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
        longitude: -75.20143855194483,
      },
    ]);
    getCurrentLocation();
  }, []);

  const onLinkPress = (username) => {
    navigation.navigate('BusinessProfile', { username });
  };

  return (
    <View style={styles.mapView}>
      <MapView
        style={styles.customMapStyle}
        region={mapRegion}
        followUserLocation
        ref={mapView}
        zoomEnabled
        showsUserLocation
        initialRegion={initialRegion}
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
                <CalloutSubview onPress={() => onLinkPress(marker.username)}>
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
          />
        </View>
      </View>
    </View>
  );
};

Map.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
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
});

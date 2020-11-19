import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';


const Map = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    //     <Text style={styles.title}>Map</Text>
    //     {/* <MapView style={styles.mapStyle} /> */}
    //   </View>
    // <View style={styles.container}> 
    //   <Text style={styles.title}>Map</Text>
    <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
    // </View>
  )
}


export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "400",
    fontSize: 35,
    color:"#fb5b5a",
    marginBottom:40,
  },

  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  pageBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  pageText:{
    color:"white"
  },
  mapStyle: {
    width: 20,
    height: 20,
  },
});


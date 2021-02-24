import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity,
} from 'react-native';
import { getMenus } from '../js/fetchData';

const CustomerMenus = ({ navigation, route }) => {
  const [business, setBusiness] = useState('');
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    setBusiness(route.params.business);
    getMenus(route.params.business).then((response) => {
      setMenus(response);
    });
  }, []);


  const RenderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigation.navigate('CustomerMenu', { business: business, menu: item.menu });
      }}
    >
      <Text style={styles.title}>{item.menu}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data = {menus}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, index) => item + index}
      />
    </SafeAreaView>
  );
};

CustomerMenus.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      business: PropTypes.string,
    }),
  }).isRequired,
};

export default CustomerMenus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: '#003049',
    marginTop: 10,
    fontSize: 25,
  },
});
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Modal, Pressable, TextInput,
} from 'react-native';
import { getMenus, addMenu } from '../js/fetchData';
import { Status } from '../js/enums';
import Alert from '../components/Alert';

const BusinessMenus = ({ navigation, route }) => {
  const [business, setBusiness] = useState('');
  const [menus, setMenus] = useState([]);
  const [menuAddModalVisible, setMenuAddModalVisible] = useState(false);
  const [newMenu, setNewMenu] = useState('');
  const [error, setError] = useState('');
  const [errorShow, setErrorShow] = useState(false);
  const [newMenuName, setNewMenuName] = useState('');
  const [menuChangeModalVisible, setMenuChangeModalVisible] = useState(false);
  const [oldMenuName, setOldMenuName] = useState('');
  const [menuDelete, setMenuDelete] = useState('');
  const [menuDeleteModalVisible, setMenuDeleteModalVisible] = useState(false);

  useEffect(() => {
    setBusiness(route.params.business);
    getMenus(route.params.business).then((response) => {
      setMenus(response);
      //Some kind of message that business profile must first be completed
    });
  }, []);

  const RenderItem = ({ item }) => (
    <View style={styles.multiButtonRow}>
      <Text style={styles.title}>{item.menu}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('BusinessMenu', { business: business, menu: item.menu });
        }}
      >
        <Text>edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setOldMenuName(item.menu);
          setMenuChangeModalVisible(true);
        }}
      >
        <Text>name</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {

        }}
      >
        <Text>delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleNewMenu = (menu) => {
    setNewMenu(menu);
  };

  const addNewMenu = (menu) => {
    addMenu(business, menu).then((response) => {
      if (response === Status.SUCCESS) {
        setMenus(menus => [...menus, {menu : menu}]);
        setMenuAddModalVisible(false);
        setNewMenu('');
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        backgroundColor = '#7fffd4'>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {setMenuAddModalVisible(true)}}
        >
          <Text style={styles.title}>Add Menu</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data = {menus}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, index) => item + index}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuAddModalVisible}
        onRequestClose={() => {
          setMenuAddModalVisible(!menuAddModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>
            Add Menu
          </Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={newMenu}
              onChangeText={handleNewMenu}
              placeholder="Menu"
            />
          </View>
          <View style={styles.multiButtonRow}>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => addNewMenu(newMenu)}
              >
              <Text>Add Menu</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setMenuAddModalVisible(!menuAddModalVisible)}
              >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuChangeModalVisible}
        onRequestClose={() => {
          setMenuAddModalVisible(!menuChangeModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.multiButtonRow}>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {}}
              >
              <Text>Change Menu Name</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setMenuChangeModalVisible(!menuChangeModalVisible)}
              >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Alert
        show={errorShow}
        msg={error}
        onClose={() => setErrorShow(false)}
        dismissable
        variant="error"
        icon="error-outline"
      />
    </SafeAreaView>
  );
};

BusinessMenus.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      business: PropTypes.string,
    }),
  }).isRequired,
};

export default BusinessMenus;

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
  modalView: {
     margin: 20,
     backgroundColor: "white",
     borderRadius: 20,
     padding: 35,
     alignItems: "center",
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 2
     },
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5
  },
  multiButtonRow : {
    flexDirection: "row",
    backgroundColor: '#edf2f4'
  },
  input: {
    paddingTop: 14,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#edf2f4',
    padding: 10,
    height: 65,
    width: '95%',
    marginBottom: 15,
  },
});
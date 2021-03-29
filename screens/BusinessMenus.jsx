import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Modal, Pressable, TextInput,
} from 'react-native';
import {
  getMenus,
  addMenu,
  changeMenuName,
  deleteMenu,
} from '../js/fetchData';
import { Status } from '../js/enums';
import Alert from '../components/Alert';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { bold } from 'chalk';

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
    <View style={styles.menu_block}>
      <Text style={styles.menu_title}>{item.menu}</Text>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('BusinessMenu', { business: business, menu: item.menu });
        }}
      >
        <Text>Edit</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setOldMenuName(item.menu);
          setMenuChangeModalVisible(true);
        }}
      >
        <Text>Rename</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          setOldMenuName(item.menu);
          setMenuDeleteModalVisible(true);
        }}
      >
        <Text>Delete</Text>
      </TouchableOpacity> */}
      <ActionButton size={40} buttonColor="rgba(251,234,144,1)" verticalOrientation="down" spacing={10}>
        <ActionButton.Item buttonColor='#4ebeb6' title="Edit" onPress={() => navigation.navigate('BusinessMenu', { business: business, menu: item.menu })}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#894c6e' title="Rename" onPress={() => {
          setOldMenuName(item.menu);
          setMenuChangeModalVisible(true);
        }}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#060b0b' title="Delete" onPress={() => {
          setOldMenuName(item.menu);
          setMenuDeleteModalVisible(true);
        }}>
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );

  const handleNewMenu = (menu) => {
    setNewMenu(menu);
  };

  const addNewMenu = (menu) => {
    addMenu(business, menu).then((response) => {
      if (response === Status.SUCCESS) {
        setMenus(menus => [...menus, { menu: menu }]);
        setMenuAddModalVisible(false);
        setNewMenu('');
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  };

  const menuNameChange = (old, ne) => {
    changeMenuName(business, old, ne).then((response) => {
      if (response === Status.SUCCESS) {
        let idx = -1;
        for (let i = 0; i < menus.length; i += 1) {
          if (menus[i].menu === old) {
            idx = i;
          }
        }
        if (idx > -1) {
          var set = menus;
          set.splice(idx, 1, { menu: ne })
          setMenus(set);
          setMenuChangeModalVisible(false);
          setNewMenu('');
        }
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  };

  const menuDel = (menu) => {
    deleteMenu(business, menu).then((response) => {
      if (response === Status.SUCCESS) {
        let idx = -1;
        for (let i = 0; i < menus.length; i += 1) {
          if (menus[i].menu === menu) {
            idx = i;
          }
        }
        if (idx > -1) {
          var set = menus;
          set.splice(idx, 1)
          setMenus(set);
          setMenuDeleteModalVisible(false);
          setOldMenuName('');
        }
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top_view}>
        <TouchableOpacity
          style={styles.new_menu_button}
          onPress={() => { setMenuAddModalVisible(true) }}
        >
          <Text style={styles.title}>New Menu</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={menus}
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
          <Text style={styles.title_2}>
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
              style={{padding:15}}
              onPress={() => addNewMenu(newMenu)}
            >
              <Text>Add Menu</Text>
            </Pressable>
            <Pressable
              style={{padding:15}}
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
          setMenuChangeModalVisible(!menuChangeModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.title_2}>
            Change {oldMenuName} Name
          </Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={newMenu}
              onChangeText={handleNewMenu}
              placeholder="Menu Name"
            />
          </View>
          <View style={styles.multiButtonRow}>
            <Pressable
              style={{padding:15}}
              onPress={() => menuNameChange(oldMenuName, newMenu)}
            >
              <Text>Change</Text>
            </Pressable>
            <Pressable
              style={{padding:15}}
              onPress={() => setMenuChangeModalVisible(!menuChangeModalVisible)}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuDeleteModalVisible}
        onRequestClose={() => {
          setMenuDeleteModalVisible(!menuDeleteModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.title_2}>
            Delete {oldMenuName}?
            </Text>
          <View style={styles.multiButtonRow}>
            <Pressable
              style={{padding:15}}
              onPress={() => menuDel(oldMenuName)}
            >
              <Text>Delete</Text>
            </Pressable>
            <Pressable
              style={{padding:15}}
              onPress={() => setMenuDeleteModalVisible(!menuDeleteModalVisible)}
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
  top_view: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop:20
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#8edab7",
    alignItems: "center",
    marginVertical: 3,
    marginHorizontal: 3,
    width:200
  },
  new_menu_button: {
    backgroundColor: "#8edab7",
    alignItems: "center",
    marginVertical: 3,
    marginHorizontal: 3,
    width:80,
    height:80,
    borderRadius:100
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#dc143c",
    padding: 3,
    marginVertical: 3,
    marginHorizontal: 3,
  },
  title: {
    marginTop:5,
    padding:10,
    color: 'white',
    fontSize: 18,
    textAlign:"center"
  },
  title_2: {
    marginLeft:15,
    color: '#003049',
    fontSize: 25,
    fontWeight: "bold"
  },
  menu_title: {
    marginLeft:25,
    paddingTop:35,
    padding:10,
    fontSize:25,
    justifyContent:'center',
    fontWeight:"bold"
  },
  menu_block: {
    height: 250,
    width:350, 
    marginTop:20,
    marginLeft:20,
    backgroundColor: 'white',
    elevation: 7,
    shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1
        }
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
  multiButtonRow: {
    flexDirection: "row",
    backgroundColor: 'transparent'
  },
  input: {
    backgroundColor:"lightgray",
    paddingTop: 14,
    fontSize: 14,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    height: 65,
    width: '95%',
    marginBottom: 15,
  },
});
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, SafeAreaView, SectionList, Modal, TouchableOpacity, Pressable, Image
} from 'react-native';
import { getMenu } from '../js/fetchData';

const BusinessMenu = ({ navigation, route }) => {
  const [business, setBusiness] = useState('');
  const [menu, setMenu] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemAvailable, setItemAvailable] = useState(true);
  const [itemPicture, setItemPicture] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  useEffect(() => {
    setBusiness(route.params.business);
    setMenu(route.params.menu);
    getMenu(route.params.business, route.params.menu).then((response) => {
      const array = [];
      array.push({
        title: '',
        order: 0,
        data: []
      });
      response.sections.forEach(element => array.push({
        title: element.section,
        order: element.order + 1,
        data: []
      }));
      array.sort((a, b) => a.order - b.order);
      const sections = [];
      sections.push(null);
      for (let i = 1; i < array.length; i++) {
        sections.push(array[i].title);
      }
      for (let j = 0; j < response.items.length; j++) {
        const ind = sections.indexOf(response.items[j].section);
        if (ind < 0) {
          array[0].data.push(response.items[j]);
        } else {
          array[ind].data.push(response.items[j]);
        }
      }
      array.forEach(elt => elt.data.sort((a, b) => a.order - b.order));
      setData(array);
    });
  }, []);

  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedItem(item.item);
        setItemPrice(item.price);
        setItemAvailable(item.available);
        setItemPicture(item.picture);
        setItemDescription(item.description);
        setModalVisible(true);
      }}
    >
      <Text style={{ fontSize: 15, color: '#003049' }}>{item.item}</Text>
      <Text style={{ fontSize: 15, color: '#003049' }}>Price: {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        backgroundColor='#deb887'
        flexDirection="row">
        <Text style={styles.title}>{menu}</Text>
      </View>
      <View
        backgroundColor='#7fffd4'
        flexDirection="row">
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
        >
          <Text style={styles.title}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
        >
          <Text style={styles.title}>Add Section</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.title}>{title}</Text>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Item: {selectedItem}</Text>
          <Text style={styles.modalText}>Price: {itemPrice}</Text>
          <Text style={styles.modalText}>Available: {itemAvailable}</Text>
          <Text style={styles.modalText}>Picture: {itemPicture}</Text>
          <View style={styles.imageView}>
            <Image
              source={{uri: 'https://vici-image-bucket.s3.amazonaws.com/images/rn_image_picker_lib_temp_45563eaf-11e4-494c-b4e1-44a6f892b014.jpg'}}
              style={styles.imageStyle}
            />
          </View>
          <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(!modalVisible)}
            >
            <Text>Hide Item</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

BusinessMenu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      business: PropTypes.string,
      menu: PropTypes.string,
    }),
  }).isRequired,
};

export default BusinessMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
  },
  item: {
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
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
  imageView: {
    elevation: 8,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 8,
    height: '40%',
  },
  imageStyle: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    margin: 5,
  },
});

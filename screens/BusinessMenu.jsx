import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, SafeAreaView, SectionList, TextInput, Modal, TouchableOpacity, Pressable, Image, Switch, FlatList, ScrollView
} from 'react-native';
import {
  getMenu,
  addMenuSection,
  addMenuItem,
  changeMenuSection,
  deleteMenuSection,
  changeSectionOrder,
  changeItemOrder,
  deleteMenuItem,
  changeMenuItem,
  changeItemSection,
  imageForItem,
} from '../js/fetchData';
import { Status } from '../js/enums';
import Alert from '../components/Alert';
import S3creds from '../S3creds.json';
import {RNS3} from 'react-native-aws3';
import {launchImageLibrary} from 'react-native-image-picker';

const BusinessMenu = ({ navigation, route }) => {
  const [business, setBusiness] = useState('');
  const [menu, setMenu] = useState('');
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [oldItem, setOldItem] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemAvailable, setItemAvailable] = useState(true);
  const [itemPicture, setItemPicture] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemAddModalVisible, setItemAddModalVisible] = useState(false);
  const [sectionAddModalVisible, setSectionAddModalVisible] = useState(false);
  const [itemSectionModalVisible, setItemSectionModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [error, setError] = useState('');
  const [errorShow, setErrorShow] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [orderChangeHook, setOrderChangeHook] = useState(0);
  const [filePath, setFilePath] = useState({});
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

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
  }, [modalVisible, itemAddModalVisible, sectionAddModalVisible, orderChangeHook, itemSectionModalVisible, imageModalVisible]);

  const Item = ({ item }) => (
    <View style={styles.multiButtonRow}>
      <Text>{item.item}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setOldItem(item.item);
          setSelectedItem(item.item);
          if (item.price) {
            setItemPrice(item.price.toString());
          } else {
            setItemPrice('');
          }
          setItemAvailable(item.available);
          setItemPicture(item.picture);
          setItemDescription(item.description);
          setModalVisible(true);
        }}
      >
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => selectItemForSectionChange(item.item)}
      >
        <Text>Section</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => itemOrderChange(item.item, item.order - 2)}
      >
        <Text>Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => itemOrderChange(item.item, item.order)}
      >
        <Text>Down</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => menuItemDelete(item.item)}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const Section = ({ item }) => {
    if (item.title !== '') {
      return (<View style={styles.multiButtonSectionRow}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {}}
      >
        <Text>Name</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => sectionOrderChange(item.title, item.order - 2)}
      >
        <Text>Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => sectionOrderChange(item.title, item.order)}
      >
        <Text>Down</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {}}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  )} else {
    return (<View style={styles.multiButtonSectionRow}>
      <Text style={styles.title}> </Text>
    </View>)
  }
  };

  const ItemSection = ({ item }) => {
    if (item.title !== '') {
      return (<View style={styles.multiButtonSectionRow}>
        <Text>{item.title}</Text>
        <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => itemSectionChange(selectedItem, item.title)}
          >
          <Text>Change to Section</Text>
        </Pressable>
      </View>);
    } else {
      return (<View style={styles.multiButtonSectionRow} />);
    }
  }

  const selectItemForSectionChange = (item) => {
    setSelectedItem(item);
    setItemSectionModalVisible(true);
  }

  const handleNewSectionName = (name) => {
    setNewSectionName(name);
  }

  const handleNewItemName = (name) => {
    setNewItemName(name);
  }

  const handleNewItemPrice = (price) => {
    setNewItemPrice(price);
  }

  const handleNewItemDescription = (description) => {
    setNewItemDescription(description);
  }

  const handleSelectedItem = (item) => {
    setSelectedItem(item);
  }

  const handleItemPrice = (price) => {
    setItemPrice(price);
  }

  const handleItemDescription = (description) => {
    setItemDescription(description);
  }

  const toggleItemAvailable = () => {
    setItemAvailable(!itemAvailable);
  }

  const addNewSection = (name) => {
    addMenuSection(business, menu, name).then((response) => {
      if (response === Status.SUCCESS) {
        setNewSectionName('');
        setSectionAddModalVisible(false);
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  }

  const addNewItem = (itemName, itemPrice, itemDescription) => {
    let pricing = 0;
    if (itemPrice !== '') {
      pricing = parseFloat(itemPrice);
    } else {
      pricing = null;
    }
    addMenuItem(business, menu, itemName, pricing, itemDescription).then((response) => {
      if (response === Status.SUCCESS) {
        setNewItemName('');
        setNewItemPrice('');
        setNewItemDescription('');
        setItemAddModalVisible(false);
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  }

  const menuItemDelete = (item) => {
    deleteMenuItem(business, menu, item).then((response) => {
      if (response === Status.SUCCESS) {
        setOrderChangeHook(orderChangeHook + 1);
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  }

  const sectionOrderChange = (section, order) => {
    changeSectionOrder(business, menu, section, order).then((response) => {
      if (response === Status.SUCCESS) {
        setOrderChangeHook(orderChangeHook + 1);
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  }

  const itemOrderChange = (item, order) => {
    changeItemOrder(business, menu, item, order).then((response) => {
      if (response === Status.SUCCESS) {
        setOrderChangeHook(orderChangeHook + 1);
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  }

  const itemSectionChange = (item, section) => {
    changeItemSection(business, menu, item, section).then((response) => {
      if (response === Status.SUCCESS) {
        setItemSectionModalVisible(!itemSectionModalVisible);
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  }

  const menuItemChange = (oldItem, newItem, price, description, available) => {
    changeMenuItem(business, menu, oldItem, newItem, parseFloat(price), description, available).then((response) => {
      if (response === Status.SUCCESS) {
        setModalVisible(false);
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  }

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      setUploadSuccessMessage('');
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response);
    });
  };

  const uploadFile = () => {
    if (Object.keys(filePath).length == 0) {
      alert('Please select image first');
      return;
    }
    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: filePath.uri,
        name: filePath.fileName,
        type: filePath.type,
      },
      S3creds,
    )
      .progress((progress) =>
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${
            progress.percent
          }%)`,
        ),
      )
      .then((response) => {
        if (response.status !== 201)
          alert('Failed to upload image to S3');
        setFilePath('');
        let {
          bucket,
          etag,
          key,
          location
        } = response.body.postResponse;
        setUploadSuccessMessage(
          `Uploaded Successfully:
          \n1. bucket => ${bucket}
          \n2. etag => ${etag}
          \n3. key => ${key}
          \n4. location => ${location}`,
        );
        imageToDB(location);
      });
  };

  const imageToDB = (url) => {
    imageForItem(business, menu, selectedItem, url).then((response) => {
      if (response === Status.SUCCESS) {
        setImageModalVisible(false);
      } else {
        setError(response);
        setErrorShow(true);
      }
    });
  }

  const changeToImageUpload = () => {
    setModalVisible(false);
    setImageModalVisible(true);
  }

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
          onPress={() => setItemAddModalVisible(true)}
        >
          <Text style={styles.title}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSectionAddModalVisible(true)}
        >
          <Text style={styles.title}>Add Section</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section }) => <Section item={section} />}
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
          <Text style={styles.title}>Edit Item</Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={selectedItem}
              onChangeText={handleSelectedItem}
              placeholder="item"
            />
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={itemPrice}
              onChangeText={handleItemPrice}
              placeholder="price"
            />
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={itemDescription}
              onChangeText={handleItemDescription}
              placeholder="description"
            />
          </View>
          <View style={styles.card}>
            <Text>Available</Text>
            <Switch
              onValueChange={toggleItemAvailable}
              value={itemAvailable}
            />
          </View>
          <View style={styles.multiButtonRow}>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => menuItemChange(oldItem, selectedItem, itemPrice, itemDescription, itemAvailable)}
              >
              <Text>Change</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => changeToImageUpload()}
              >
              <Text>Change Image</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}
              >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={itemSectionModalVisible}
        onRequestClose={() => {
          setItemSectionModalVisible(!itemSectionModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>Change {selectedItem} Section</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <ItemSection item={item}/>}
          />
          <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setItemSectionModalVisible(!itemSectionModalVisible)}
            >
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => {
          setImageModalVisible(!imageModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>
            UploadImage
          </Text>
          <ScrollView>
            {filePath.uri ? (
              <>
                <Image
                  source={{uri: filePath.uri}}
                  style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>
                  {filePath.uri}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonStyleGreen}
                  onPress={uploadFile}>
                  <Text style={styles.textStyleWhite}>
                    Upload Image
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
            {uploadSuccessMessage ? (
              <Text style={styles.textStyleGreen}>
                {uploadSuccessMessage}
              </Text>
            ) : null}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={chooseFile}>
              <Text style={styles.textStyleWhite}>
                Choose Image
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setImageModalVisible(!imageModalVisible)}
            >
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={itemAddModalVisible}
        onRequestClose={() => {
          setItemAddModalVisible(!itemAddModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>Add New Section</Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={newItemName}
              onChangeText={handleNewItemName}
              placeholder="New Item"
            />
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={newItemPrice}
              onChangeText={handleNewItemPrice}
              placeholder="New Item Price"
            />
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={newItemDescription}
              onChangeText={handleNewItemDescription}
              placeholder="New Item Description"
            />
          </View>
          <View style={styles.multiButtonRow}>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => addNewItem(newItemName, newItemPrice, newItemDescription)}
              >
              <Text>Add Item</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setItemAddModalVisible(!itemAddModalVisible)}
              >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={sectionAddModalVisible}
        onRequestClose={() => {
          setSectionAddModalVisible(!sectionAddModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.title}>Add New Section</Text>
          <View style={styles.card}>
            <TextInput
              style={styles.input}
              value={newSectionName}
              onChangeText={handleNewSectionName}
              placeholder="New Section"
            />
          </View>
          <View style={styles.multiButtonRow}>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => addNewSection(newSectionName)}
              >
              <Text>Add</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setSectionAddModalVisible(!sectionAddModalVisible)}
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
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 3,
    marginVertical: 3,
    marginHorizontal: 3,
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#dc143c",
    padding: 3,
    marginVertical: 3,
    marginHorizontal: 3,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  multiButtonRow : {
    flexDirection: "row",
    backgroundColor: '#edf2f4'
  },
  multiButtonSectionRow : {
    flexDirection: "row",
    backgroundColor: '#a9a9a9'
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

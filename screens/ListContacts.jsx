/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, Text, StyleSheet, View, FlatList,
} from 'react-native';
import { SearchBar, Avatar, ListItem } from 'react-native-elements';

const list = [
  {
    name: 'Derek He',
    avatar_url: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    username: 'derekhe',
    email: 'derekhe@gmail.com',
  },
  {
    name: 'Ally Zhang',
    avatar_url: 'https://bootdey.com/img/Content/avatar/avatar8.png',
    username: 'allyzhang',
    email: 'allyzhang@gmail.com',
  },
  {
    name: 'Rosa Sun',
    avatar_url: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    username: 'rosasun',
    email: 'rosasun@gmail.com',
  },
  {
    name: 'Kaung Khant',
    avatar_url: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    username: 'kaungkhant',
    email: 'kk@gmail.com',
  },
];

const ListContacts = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(list);
    setMasterDataSource(list);
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     setFilteredDataSource(responseJson);
    //     setMasterDataSource(responseJson);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter((item) => {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => (
    // Flat List Item
    <View>
      <ListItem
        bottomDivider
        containerStyle={{ backgroundColor: '#2B2D42' }}
        onPress={() => getItem(item)}
      >
        <Avatar rounded size={55} title={item.name[0]} source={item.avatar_url && { uri: item.avatar_url }} />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.username}>{item.username}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>

    // <View style={styles.itemStyle} onPress={() => getItem(item)}>
    //   {/* <Avatar source={{uri: item.avatar_url}} /> */}
    //   <Text style = {styles.title}> {item.name} </Text>
    //   {/* <Text style = {styles.subtitle}> {item.subtitle} </Text> */}
    // </View>
  );

  const ItemSeparatorView = () => (
    // Flat List Item Separator
    <View
      style={{
        width: '100%',
        backgroundColor: '#8d99ae',
      }}
    />
  );

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate('UserProfile',
      {
        name: item.name, avatar_url: item.avatar_url, username: item.username, email: item.email,
      });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.inputText}
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction('')}
        placeholder="Search Contact..."
        value={search}
      />
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  itemStyle: {
    padding: 10,
  },
  inputView: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  title: {
    fontSize: 20,
    height: 30,
    color: 'white',
  },
  username: {
    fontSize: 15,
    color: '#8d99ae',
  },
});

export default ListContacts;

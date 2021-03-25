import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, FlatList,
} from 'react-native';
import { SearchBar, Avatar, ListItem } from 'react-native-elements';
import { getAllCustomerProfiles } from '../js/fetchData';
import { getUsername } from '../js/asyncStorage';

const ListContacts = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    // check for edit permissions
    getUsername().then((user) => {
      getAllCustomerProfiles().then((result) => {
        const users = result.filter((userData) => userData.username !== user)
          .map((userData) => ({
            name: `${userData.firstName.trim()} ${userData.lastName.trim()}`.trim() || userData.username.trim(),
            username: userData.username,
            email: userData.email,
            avatar_url: userData.picture,
          }));
        setFilteredDataSource(users);
        setMasterDataSource(users);
      });
    });
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

  const onPressItem = (item) => {
    // Function for click on an item
    navigation.navigate('UserProfile',
      {
        username: item.username,
      });
  };

  const ItemView = ({ item }) => (
    // Flat List Item
    <View>
      <ListItem
        bottomDivider
        containerStyle={styles.listItemContainer}
        onPress={() => onPressItem(item)}
      >
        <Avatar
          rounded
          size={55}
          title={item.name[0]}
          source={item.avatar_url && { uri: item.avatar_url }}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.username}>{item.username}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );

  const ItemSeparatorView = () => (
    // Flat List Item Separator
    <View
      style={styles.itemSeparator}
    />
  );

  ItemView.propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      avatar_url: PropTypes.string,
    }).isRequired,
  };

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.inputText}
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction('')}
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

ListContacts.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
  },
  itemSeparator: {
    width: '100%',
    backgroundColor: '#8d99ae',
  },
  listItemContainer: {
    backgroundColor: '#2B2D42',
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

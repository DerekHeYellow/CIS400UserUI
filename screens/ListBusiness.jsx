import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import { SearchBar, Avatar, ListItem } from 'react-native-elements';

import { getAllBusinessProfiles } from '../js/fetchData';

const ListBusiness = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    getAllBusinessProfiles().then((result) => {
      const items = result.map((businessProfile) => ({
        username: businessProfile.username,
        name: businessProfile.businessName,
        avatar_url: businessProfile.picture,
        subtitle: businessProfile.description,
        email: businessProfile.businessEmail,
      }));
      setFilteredDataSource(items);
      setMasterDataSource(items);
    });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter((item) => {
        const itemData = (item.name + item.subtitle)
          ? (item.name + item.subtitle).toUpperCase()
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

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate('BusinessProfile',
      {
        username: item.username, name: item.name, type: item.subtitle, email: item.email,
      });
  };

  const ItemView = ({ item }) => (
    // Flat List Item
    <View>
      <ListItem
        bottomDivider
        containerStyle={styles.listItem}
        onPress={() => getItem(item)}
      >
        <Avatar
          rounded
          size={55}
          title={item.name[0]}
          source={item.avatar_url && { uri: item.avatar_url }}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );

  ItemView.propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      subtitle: PropTypes.string,
      avatar_url: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  };

  const ItemSeparatorView = () => (
    // Flat List Item Separator
    <View
      style={styles.flatlist}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.inputText}
        round
        searchIcon={{ size: 24 }}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={() => searchFilterFunction('')}
        placeholder="Search Business..."
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

ListBusiness.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ListBusiness;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  listItem: {
    backgroundColor: '#2B2D42',
  },
  flatlist: {
    height: 1.5,
    width: '100%',
    backgroundColor: '#8d99ae',
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 30,
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: '#8d99ae',
  },
});

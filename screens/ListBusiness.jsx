import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import { SearchBar, Avatar, ListItem } from 'react-native-elements';

const list = [
  {
    username: 'kims',
    name: 'Kim\'s',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Chinese Food Truck',
    email: 'kims@gmail.com',
  },
  {
    username: 'magicCarpet',
    name: 'Magic Carpet',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Middle Eastern Food Truck',
    email: 'magiccarpet@gmail.com',
  },
  {
    name: 'Don Memos',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Mexican Food Truck',
    email: 'donmemos@gmail.com',
  },
  {
    name: 'Yue Kee',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Chinese Food Truck',
    email: 'yuekees@gmail.com',
  },
  {
    name: 'Lynn\'s',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Breakfast/Sandwich Food Truck',
    email: 'lynns@gmail.com',
  },
  {
    name: 'Hemo\'s',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Breakfast/Sandwich Food Truck',
    email: 'hemos@gmail.com',
  },
  {
    name: 'MexiCali',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Mexican Food Truck',
    email: 'mexicali@gmail.com',
  },
];

const ListBusiness = ({ navigation }) => {
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

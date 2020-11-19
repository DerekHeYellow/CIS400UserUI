import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native';
import { SearchBar, Avatar} from 'react-native-elements';

const list = [
  {
    name: 'Derek He',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
  },
  {
    name: 'Ally Zhang',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
  },
  {
    name: 'Rosa Sun',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
  },
  {
    name: 'Kaung Khant',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
  }
];

const ListContacts = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(list)
    setMasterDataSource(list)
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
      const newData = masterDataSource.filter(function (item) {
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

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={styles.itemStyle} onPress={() => getItem(item)}>
        {/* <Avatar source={{uri: item.avatar_url}} /> */}
        <Text style = {styles.title}> {item.name} </Text>
        {/* <Text style = {styles.subtitle}> {item.subtitle} </Text> */}
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Name : ' + item.name);
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
    backgroundColor: '#003f5c',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  itemStyle: {
    padding: 10,
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
  title:{
    fontSize: 20,
    height: 30,
    color:"white"
  },
  subtitle:{
    fontSize: 15,
    color:"gray"
  },
});

export default ListContacts;

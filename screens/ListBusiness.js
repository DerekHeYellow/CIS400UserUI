import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native';
import { SearchBar, Avatar, ListItem } from 'react-native-elements';

const list = [
  {
    name: 'Kim\'s',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Chinese Food Truck',
    email: 'kims@gmail.com'
  },
  {
    name: 'Magic Carpet',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Middle Eastern Food Truck',
    email: 'magiccarpet@gmail.com'
  },
  {
    name: 'Don Memos',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Mexican Food Truck',
    email: 'donmemos@gmail.com'
  },
  {
    name: 'Yue Kee',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Chinese Food Truck',
    email: 'yuekees@gmail.com'
  },
  {
    name: 'Lynn\'s',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Breakfast/Sandwich Food Truck',
    email: 'lynns@gmail.com'
  } ,
  {
    name: 'Hemo\'s',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Breakfast/Sandwich Food Truck',
    email: 'hemos@gmail.com'
  } ,
  {
    name: 'MexiCali',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/WIN_preview_Food.jpg',
    subtitle: 'Mexican Food Truck',
    email: 'mexicali@gmail.com'
    } ,
];

const ListBusiness = ({ navigation }) => {
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

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View>
      <ListItem 
      bottomDivider
      containerStyle={{backgroundColor:'#003f5c'}}
      onPress={() => getItem(item)} >
        <Avatar title={item.name[0]} source={item.avatar_url && { uri: item.avatar_url }}/>
        <ListItem.Content>
          <ListItem.Title style = {styles.title}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style = {styles.subtitle}>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron/>
      </ListItem>
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
    navigation.navigate('BusinessProfile', 
    {name: item.name, type: item.subtitle, email: item.email})
  };

  return (
    <View style={styles.container}>
        <SearchBar
          style={styles.inputText}
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
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
    fontSize: 12,
    color:'#D3D3D3'
  }
});

export default ListBusiness;

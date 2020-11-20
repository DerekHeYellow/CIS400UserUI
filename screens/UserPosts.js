import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Rosa Sun", text:"I ate some stuff today. Yum yum!", attachment:"https://via.placeholder.com/100x100/FFB6C1/000000"},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Rosa Sun", text:"I didn't eat anything. I'm so hungry I don't want to code.", attachment:"https://via.placeholder.com/100x100/20B2AA/000000"},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Rosa Sun", text:"I want to drink boba tea. I know a good place! Message me!", attachment:""},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Rosa Sun", text:"I like posting so much, I'm addicted to social media and I have no regrets about it.", attachment:""},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Rosa Sun", text:"I miss food!", attachment:"https://via.placeholder.com/100x100/FFB6C1/000000"},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Rosa Sun", text:"It's so cold today, but will that stop me from getting food? NO!", attachment:"https://via.placeholder.com/100x100/7B68EE/000000"},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Rosa Sun", text:"I am posting just to post.", attachment:""},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Rosa Sun", text:"I gained 70 pounds last month. Yikes!", attachment:""},
      ]
    }
  }

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          let attachment = <View/>;

          let mainContentStyle;
          if(Notification.attachment) {
            mainContentStyle = styles.mainContent;
            attachment = <Image style={styles.attachment} source={{uri:Notification.attachment}}/>
          }
          return(
            <View style={styles.container}>
              <Image source={{uri:Notification.image}} style={styles.avatar}/>
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.name}>{Notification.name}</Text>
                    <Text>{Notification.text}</Text>
                  </View>
                  <Text style={styles.timeAgo}>
                    2 hours ago
                  </Text>
                </View>
                {attachment}
              </View>
            </View>
          );
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    fontSize:16,
    color:"#1E90FF"
  }
});
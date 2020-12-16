import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image,
} from 'react-native';
import { Icon } from 'react-native-elements';

// eslint-disable-next-line no-unused-vars
const Posts = ({ navigation }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      {
        id: 1, image: 'https://bootdey.com/img/Content/avatar/avatar3.png', name: 'Rosa Sun', text: 'I ate some stuff today. Yum yum!', attachment: 'https://via.placeholder.com/100x100/FFB6C1/000000',
      },
      {
        id: 2, image: 'https://bootdey.com/img/Content/avatar/avatar3.png', name: 'Rosa Sun', text: "I didn't eat anything. I'm so hungry I don't want to code.", attachment: 'https://via.placeholder.com/100x100/20B2AA/000000',
      },
      {
        id: 3, image: 'https://bootdey.com/img/Content/avatar/avatar3.png', name: 'Rosa Sun', text: 'I want to drink boba tea. I know a good place! Message me!', attachment: '',
      },
      {
        id: 4, image: 'https://bootdey.com/img/Content/avatar/avatar3.png', name: 'Rosa Sun', text: "I like posting so much, I'm addicted to social media and I have no regrets about it.", attachment: '',
      },
      {
        id: 5, image: 'https://bootdey.com/img/Content/avatar/avatar3.png', name: 'Rosa Sun', text: 'I miss food!', attachment: 'https://via.placeholder.com/100x100/FFB6C1/000000',
      },
      {
        id: 6, image: 'https://bootdey.com/img/Content/avatar/avatar3.png', name: 'Rosa Sun', text: "It's so cold today, but will that stop me from getting food? NO!", attachment: 'https://via.placeholder.com/100x100/7B68EE/000000',
      },
      {
        id: 7, image: 'https://bootdey.com/img/Content/avatar/avatar3.png', name: 'Rosa Sun', text: 'I am posting just to post.', attachment: '',
      },
      {
        id: 8, image: 'https://bootdey.com/img/Content/avatar/avatar3.png', name: 'Rosa Sun', text: 'I gained 70 pounds last month. Yikes!', attachment: '',
      },
    ]);
  }, []);

  return (
    <View style={styles.postsContainer}>
      <View style={styles.postTextInputView}>
        <TextInput
          style={styles.postTextInput}
          multiline
          numberOfLines={4}
          editable
          maxLength={40}
          placeholder="Write a post..."
          placeholderTextColor="#484848"
        />
        <TouchableOpacity style={styles.postButton}>
          <Icon name="post-add" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.allPosts}>
        <FlatList
          style={styles.root}
          data={data}
          extraData={data}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            const Notification = item.item;
            let attachment = <View />;

            let mainContentStyle;
            if (Notification.attachment) {
              mainContentStyle = styles.mainContent;
              attachment = (
                <Image
                  style={styles.attachment}
                  source={{ uri: Notification.attachment }}
                />
              );
            }
            return (
              <View style={styles.container}>
                <Image source={{ uri: Notification.image }} style={styles.avatar} />
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
          }}
        />
      </View>
    </View>
  );
};

export default Posts;

Posts.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    backgroundColor: '#edf2f4',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  postTextInputView: {
    width: '100%',
    padding: 20,
    backgroundColor: '#2B2D42',
  },
  postTextInput: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    height: 100,
  },
  allPosts: {
    width: '100%',
    height: '90%',
  },
  postButton: {
    padding: 7,
    backgroundColor: '#8d99ae',
  },
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: '#1E90FF',
  },
});

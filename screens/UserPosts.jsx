/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { Icon } from 'react-native-elements';
import { getPostsByUser, deletePostById } from '../js/fetchData';
import { Status } from '../js/enums';
import { getUsername } from '../js/asyncStorage';

// eslint-disable-next-line no-unused-vars
const UserPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [postTrigger, setPostTrigger] = useState(0);
  const [canEdit, setCanEdit] = useState(false);

  const refreshPosts = () => {
    setPostTrigger((t) => t + 1);
  };

  useEffect(() => {
    // check for edit permissions
    getUsername().then((username) => {
      if (username === route.params.username) {
        setCanEdit(true);
      }
    });
    getPostsByUser(route.params.username).then((postResult) => {
      const postItems = postResult.map((postData) => {
        // convert to data object
        const utcDate = postData.postDate.split('.')[0];
        const date = new Date(utcDate);
        return {
          id: postData.postId,
          name: postData.username,
          text: postData.post,
          date,
        };
      });
      const sortedPostItems = postItems.sort((a, b) => b.date - a.date);
      setPosts(sortedPostItems);
      setIsFetching(false);
    });
  }, [postTrigger]);

  const convertDateToString = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString(undefined, options);
  };

  const renderMentionsText = (matchingString) => {
    // matches => ["@[Don Memos](id:donmemos)", "Don Memos", "donmemos"]
    const pattern = /@\[([^\]]+?)\]\(id:([^\]]+?)\)/im;
    const match = matchingString.match(pattern);
    return `@${match[1]}`;
  };

  const handleMentionPress = (name) => {
    const groupPat = /@\[([^\]]+?)\]\(id:([^\]]+?)\)/im;
    const businessUsername = name.match(groupPat)[2];
    navigation.navigate('BusinessProfile',
      {
        username: businessUsername,
      });
  };

  const getParsedText = (text, style) => (
    <ParsedText
      style={style}
      multiline
      parse={
            [
              {
                pattern: /@\[([^\]]+?)\]\(id:([^\]]+?)\)/im,
                style: styles.mention,
                onPress: handleMentionPress,
                renderText: renderMentionsText,
              },
            ]
          }
      childrenProps={{ allowFontScaling: false }}
    >
      {text}
    </ParsedText>
  );

  const onDelete = (postId) => {
    deletePostById(postId).then((result) => {
      if (result === Status.SUCCESS) {
        refreshPosts();
      }
    });
  };

  return (
    <View style={styles.allPosts}>
      <FlatList
        style={styles.root}
        data={posts}
        extraData={posts}
        refreshing={isFetching}
        onRefresh={() => {
          setIsFetching(true);
          refreshPosts();
        }}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <View style={styles.container}>
            {item.item.image
            && (<Image source={{ uri: item.item.image }} style={styles.avatar} />)}
            {!item.item.image
            && (
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>
                {!!item.item.name
              && item.item.name.substring(0, 2).toUpperCase()}
              </Text>
            </View>
            )}
            <View style={styles.content}>
              <View style={styles.mainContent}>
                <View style={styles.text}>
                  <Text style={styles.name}>{item.item.name}</Text>
                  {getParsedText(item.item.text, styles.postBody)}
                </View>
                <Text style={styles.timeAgo}>
                  {convertDateToString(item.item.date)}
                </Text>
              </View>
            </View>
            {canEdit
            && (
            <View style={styles.deleteButton}>
              <Icon name="delete" type="material" size={20} color="black" onPress={() => onDelete(item.item.id)} />
            </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default UserPosts;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  allPosts: {
    flex: 1,
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
    backgroundColor: '#8d99ae',
    justifyContent: 'center',
    display: 'flex',
    marginRight: 15,
  },
  avatarInitials: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
  },
  mainContent: {
    paddingRight: 10,
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
    width: '100%',
    fontSize: 16,
    color: '#1E90FF',
  },
  mention: {
    color: '#244dc9',
  },
  deleteButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  postBody: {
    marginTop: 5,
    width: '100%',
  },
});

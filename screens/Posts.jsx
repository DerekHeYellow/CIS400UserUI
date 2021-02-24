import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, Text, View, TouchableOpacity, FlatList, Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import ParsedText from 'react-native-parsed-text';
import Editor, { } from 'react-native-mentions-editor';
import { getAllBusinessProfiles, getAllPosts, createPost } from '../js/fetchData';
import { getUsername } from '../js/asyncStorage';

// eslint-disable-next-line no-unused-vars
const Posts = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [postTrigger, setPostTrigger] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [showEditor, setShowEditor] = useState(true);
  const [message, setMessage] = useState(null);
  const [clearInput, setClearInput] = useState(false);
  const [showMentions, setShowMentions] = useState(false);

  const onChangeHandler = (msg) => {
    /**
     * this callback will be called whenever input value change and will have
     * formatted value for mentioned syntax
     * @message : {text: 'Hey @(mrazadar)(id:1) this is good work.',
     * displayText: `Hey @mrazadar this is good work`}
     * */

    setMessage(msg);
    setClearInput(false);
  };

  const toggleEditor = () => {
    /**
     * This callback will be called
     * once user left the input field.
     * This will handle blur event.
     */
    // this.setState({
    //   showEditor: false,
    // })
  };

  const onHideMentions = () => {
    /**
     * This callback will be called
     * When MentionsList hide due to any user change
     */
    setShowMentions(false);
  };

  const refreshPosts = () => {
    setPostTrigger((t) => t + 1);
  };

  useEffect(() => {
    getAllBusinessProfiles().then((result) => {
      const items = result.map((businessData) => ({
        id: businessData.username,
        name: businessData.businessName,
        username: businessData.username,
      }));
      setAllSuggestions(items);
    });
    getUsername().then((result) => {
      setUsername(result);
    });
  }, []);

  useEffect(() => {
    getAllPosts().then((postResult) => {
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

  const findMentions = () => {
    const pattern = /@\[([^\]]+?)\]\(id:([^\]]+?)\)/igm;
    const allMentions = message.text.match(pattern).map((mention) => {
      const groupPat = /@\[([^\]]+?)\]\(id:([^\]]+?)\)/im;
      return mention.match(groupPat)[2];
    });
    return allMentions;
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

  // Create post
  const onPostSubmitClick = () => {
    createPost({
      username,
      post: message.text,
      businessMentions: findMentions(),
    }).then(() => {
      setMessage(null);
      setClearInput(true);
      refreshPosts();
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

  return (
    <View style={styles.postsContainer}>
      <View style={styles.postTextInputView}>
        <View style={styles.content}>
          <Editor
            list={allSuggestions}
            initialValue=""
            clearInput={clearInput}
            onChange={onChangeHandler}
            showEditor={showEditor}
            toggleEditor={toggleEditor}
            showMentions={showMentions}
            onHideMentions={onHideMentions}
            placeholder="Write a post..."
            textInputStyle={styles.postTextInput}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.postButton} onPress={onPostSubmitClick}>
        <Icon name="post-add" size={30} color="white" />
      </TouchableOpacity>
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
            </View>
          )}
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  postTextInputView: {
    paddingBottom: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  postTextInput: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  allPosts: {
    width: '100%',
    height: '90%',
  },
  postButton: {
    padding: 7,
    backgroundColor: '#8d99ae',
    width: '100%',
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
    width: '100%',
  },
  mainContent: {
    paddingRight: 10,
  },
  postBody: {
    marginTop: 5,
    width: '100%',
  },
  mention: {
    color: '#244dc9',
  },
});

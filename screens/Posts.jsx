import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Editor, { } from 'react-native-mentions-editor';
import { getAllBusinessProfiles, getAllPosts, createPost } from '../js/fetchData';
import { getUsername } from '../js/asyncStorage';
import PostList from '../components/PostList';
import { Status } from '../js/enums';

const Posts = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [postTrigger, setPostTrigger] = useState(0);
  const [loadDone, setLoadDone] = useState(false);

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
    setLoadDone(false);
    setPostTrigger((t) => t + 1);
  };

  useEffect(() => {
    getAllBusinessProfiles().then((result) => {
      const items = result
        .filter((businessData) => (businessData.businessName))
        .map((businessData) => ({
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
      if (postResult === Status.ERROR.OTHER_ERROR) {
        setPosts([{ id: 0, error: postResult }]);
      } else if (Array.isArray(postResult) && !postResult.length) {
        setPosts([{ id: 0, noItems: true }]);
      } else {
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
      }
      setLoadDone(true);
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

  // Create post
  const onPostSubmitClick = () => {
    if (message?.text) {
      createPost({
        username,
        post: message.text,
        businessMentions: findMentions(),
      }).then(() => {
        setMessage(null);
        setClearInput(true);
        refreshPosts();
      });
    }
  };

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
      <PostList
        navigation={navigation}
        posts={posts}
        refreshPosts={refreshPosts}
        loadDone={loadDone}
      />
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
  postButton: {
    padding: 7,
    backgroundColor: '#8d99ae',
    width: '100%',
  },
  content: {
    flex: 1,
  },
});

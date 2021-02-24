/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getPostsByUser } from '../js/fetchData';
import { getUsername } from '../js/asyncStorage';
import PostList from '../components/PostList';
import { Status } from '../js/enums';

// eslint-disable-next-line no-unused-vars
const UserPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loadDone, setLoadDone] = useState(false);
  const [postTrigger, setPostTrigger] = useState(0);
  const [canEdit, setCanEdit] = useState(false);

  const refreshPosts = () => {
    setLoadDone(false);
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

  return (
    <PostList
      navigation={navigation}
      posts={posts}
      refreshPosts={refreshPosts}
      loadDone={loadDone}
      editable={canEdit}
    />
  );
};

export default UserPosts;

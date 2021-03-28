import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, FlatList,
} from 'react-native';
import { Status } from '../js/enums';
import { deletePostById } from '../js/fetchData';
import Alert from './Alert';
import PostItem from './PostItem';

const PostList = ({
  navigation, refreshPosts, posts, loadDone, editable,
}) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (loadDone) {
      setIsFetching(false);
    }
  }, [loadDone]);

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => {
          if (item.item.noItems) {
            return (
              <View style={styles.alert}>
                <Alert
                  msg="There are no posts to show."
                  variant="light"
                  icon="filter-none"
                />
              </View>
            );
          }
          if (item.item.error) {
            return (
              <View style={styles.alert}>
                <Alert
                  msg={item.item.error}
                  variant="light"
                  icon="error-outline"
                />
              </View>
            );
          }
          return (
            <PostItem
              navigation={navigation}
              id={item.item.id}
              user={item.item.name}
              post={item.item.text}
              timestamp={item.item.date}
              image={item.item.image}
              editable={editable}
              onDelete={onDelete}
            />
          );
        }}
      />
    </View>
  );
};

export default PostList;

PostList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  refreshPosts: PropTypes.func.isRequired,
  loadDone: PropTypes.bool,
  posts: PropTypes.arrayOf(PropTypes.object),
  editable: PropTypes.bool,
};

PostList.defaultProps = {
  editable: false,
  loadDone: false,
  posts: [],
};

const styles = StyleSheet.create({
  allPosts: {
    flex: 1,
    width: '100%',
  },
  root: {
    backgroundColor: '#FFFFFF',
  },
  alert: {
    marginTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
  },
});

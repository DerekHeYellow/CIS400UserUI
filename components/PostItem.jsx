import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { Icon } from 'react-native-elements';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pattern } from '../js/enums';

const PostItem = ({
  navigation, id, image, user, post, timestamp, editable, onDelete,
}) => {
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
    const pattern = Pattern.MENTION_REGEX;
    const match = matchingString.match(pattern);
    return `@${match[1]}`;
  };

  const handleMentionPress = (name) => {
    const groupPat = Pattern.MENTION_REGEX;
    const businessUsername = name.match(groupPat)[2];
    const businessName = name.match(groupPat)[1];
    navigation.push('BusinessProfile',
      {
        username: businessUsername,
        name: businessName,
      });
  };

  const getParsedText = (text, style) => (
    <ParsedText
      style={style}
      multiline
      parse={
        [
          {
            pattern: Pattern.MENTION_REGEX,
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

  const onPressUsername = () => {
    navigation.push('UserProfile',
      {
        username: user,
        myProfile: false,
      });
  };

  return (
    <View style={styles.container}>
      {image && (<Image source={{ uri: image }} style={styles.avatar} />)}
      {!image
        && (
        <View style={styles.avatar}>
          <Text style={styles.avatarInitials}>
            {!!user
                && user.substring(0, 2).toUpperCase()}
          </Text>
        </View>
        )}
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.text}>
            <TouchableOpacity onPress={onPressUsername}>
              <Text style={styles.name}>{user}</Text>
            </TouchableOpacity>
            {getParsedText(post, styles.postBody)}
          </View>
          <Text style={styles.timeAgo}>
            {convertDateToString(timestamp)}
          </Text>
        </View>
      </View>
      {editable
            && (
            <View style={styles.deleteButton}>
              <Icon name="delete" type="material" size={20} color="black" onPress={() => onDelete(id)} />
            </View>
            )}
    </View>
  );
};

PostItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  user: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired,
  post: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onDelete: PropTypes.func,
};

PostItem.defaultProps = {
  image: null,
  editable: false,
  onDelete: null,
};

export default PostItem;

const styles = StyleSheet.create({
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

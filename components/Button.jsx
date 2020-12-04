/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

const Button = ({
  children, styles, label, onPress, noDefaultStyles,
}) => {
  function getContent() {
    if (children) {
      return children;
    }
    return <Text style={styles.label}>{label}</Text>;
  }

  return (
    <TouchableHighlight
      underlayColor="#ccc"
      onPress={onPress}
      style={[
        noDefaultStyles ? '' : localStyles.button,
        styles ? styles.button : '']}
    >
      { getContent() }
    </TouchableHighlight>
  );
};

const localStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default Button;

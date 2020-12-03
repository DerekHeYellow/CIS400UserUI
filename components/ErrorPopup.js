import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Text,
} from 'react-native';
import { Icon } from 'react-native-elements';

const ErrorPopup = ({error, show, onClose}) => {
  return (
    <View style={styles.errorContainer}>
      {
        show &&
        <View style={styles.errorView}>
          <View style={styles.closeButton}> 
            <Icon name="clear" type="material" size={20} color="#905300" onPress={onClose}/>
          </View>
          <Icon name="error-outline" type="material" size={35} color="#905300" />
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      }
    </View>
  );
};

ErrorPopup.propTypes = {
  error: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 6,
    right: 10,
  },
  errorContainer: {
    width: '75%',
  },
  errorView: {
    width: '100%',
    backgroundColor: '#ffae42',
    marginBottom: 25,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  errorText: {
    marginTop: 2,
    color: '#905300',
    textAlign: 'center',
    width: '85%',
    fontWeight: "bold",
  }
});

export default ErrorPopup;
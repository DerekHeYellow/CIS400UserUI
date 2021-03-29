/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BusinessProfile from '../screens/BusinessProfile';
import BusinessMentions from '../screens/BusinessMentions';
import CustomerMenus from '../screens/CustomerMenus';
import CustomerMenu from '../screens/CustomerMenu';
import EditUserProfile from '../screens/EditUserProfile';
import UserProfile from '../screens/UserProfile';
import UserPosts from '../screens/UserPosts';

import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { color } from 'react-native-reanimated';
import { bold } from 'chalk';

const Stack = createStackNavigator();

const PeopleStackNavigator = ({ route }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserProfile"
      component={UserProfile}
      initialParams={{ username: route.params.username, myProfile: true }}
      // eslint-disable-next-line no-shadow
      options={({ route }) => {
        if (!route.params.myProfile) {
          return { title: route.params.username };
        }
        return {
          title: 'My Profile', headerLeft: null,
          headerRight: () => (
            <Menu>
              <MenuTrigger style={styles.header_button}>
                <Text>. . .</Text>
                </MenuTrigger> 
              <MenuOptions style={styles.header_option}>
                <MenuOption onSelect={value => alert(`Selected number: ${value}`)} value={1} text='My Posts' />
                <MenuOption value={2} onSelect={() => navigation.push('EditUserProfile', { email, username })}>
                  <Text style={{ color: 'black' }}>Edit Profile</Text>
                </MenuOption>
                <MenuOption value={3}>
                <Text style={{ color: 'red' }}>Log Out</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ),
        };
      }}
    />
    <Stack.Screen
      name="UserPosts"
      component={UserPosts}
      options={{ title: 'My Posts' }}
    />
    <Stack.Screen
      name="BusinessProfile"
      component={BusinessProfile}
      // eslint-disable-next-line no-shadow
      options={({ route }) => ({ title: route.params.name })}
    />
    <Stack.Screen
      name="EditUserProfile"
      component={EditUserProfile}
      options={{
        title: 'Edit Profile'
      }}
    />
    <Stack.Screen
      name="BusinessMentions"
      component={BusinessMentions}
      options={{ title: 'Mentions' }}
    />
    <Stack.Screen
      name="CustomerMenus"
      component={CustomerMenus}
      options={{ title: 'Menus' }}
    />
    <Stack.Screen
      name="CustomerMenu"
      component={CustomerMenu}
      // eslint-disable-next-line no-shadow
      options={({ route }) => ({ title: route.params.menu })}
    />
  </Stack.Navigator>
);

export default PeopleStackNavigator;

// STYLEzzz
const styles = StyleSheet.create({
  header_button: {
    marginRight:10,
    padding:10,
  },
  header_option: {
    padding:10,
  }
});



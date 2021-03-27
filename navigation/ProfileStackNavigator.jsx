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
        return { title: 'My Profile', headerLeft: null };
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
      options={{ title: 'Edit Profile' }}
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

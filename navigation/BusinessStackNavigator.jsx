import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListBusiness from '../screens/ListBusiness';
import BusinessProfile from '../screens/BusinessProfile';
import BusinessMentions from '../screens/BusinessMentions';
import CustomerMenus from '../screens/CustomerMenus';
import CustomerMenu from '../screens/CustomerMenu';
import UserProfile from '../screens/UserProfile';
import EditUserProfile from '../screens/EditUserProfile';
import UserPosts from '../screens/UserPosts';

const Stack = createStackNavigator();

const BusinessStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ListBusiness"
      component={ListBusiness}
      options={{ title: 'Explore', headerLeft: null }}
    />
    <Stack.Screen
      name="BusinessProfile"
      component={BusinessProfile}
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
      options={({ route }) => ({ title: route.params.menu })}
    />
    <Stack.Screen
      name="UserProfile"
      component={UserProfile}
      options={({ route }) => ({ title: route.params.username })}
    />
    <Stack.Screen
      name="UserPosts"
      component={UserPosts}
      options={{ title: 'Posts' }}
    />
  </Stack.Navigator>
);

export default BusinessStackNavigator;

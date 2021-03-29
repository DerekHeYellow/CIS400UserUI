import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ResetPassword from './screens/ResetPassword';

import TabNavigator from './navigation/TabNavigator';
import UserType from './screens/UserType';
import EditBusinessProfile from './screens/EditBusinessProfile';
import BusinessProfile from './screens/BusinessProfile';
import CustomerMenu from './screens/CustomerMenu';
import CustomerMenus from './screens/CustomerMenus';
import BusinessMentions from './screens/BusinessMentions';
import UserProfile from './screens/UserProfile';
import UserPosts from './screens/UserPosts';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{ title: 'Login' }}
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        options={{ title: 'Sign up' }}
        component={Signup}
      />
      <Stack.Screen
        name="ResetPassword"
        options={{ title: 'Reset Password' }}
        component={ResetPassword}
      />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={TabNavigator}
      />
      <Stack.Screen
        name="UserType"
        component={UserType}
      />
      <Stack.Screen
        name="BusinessProfile"
        component={BusinessProfile}
        options={({ route }) => {
          if (!route.params.myProfile) {
            return { title: route.params.username };
          }
          return { title: 'My Profile', headerLeft: null };
        }}
      />
      <Stack.Screen
        name="EditBusinessProfile"
        component={EditBusinessProfile}
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
  </NavigationContainer>
);

export default App;

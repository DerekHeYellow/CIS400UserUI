import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ResetPassword from './screens/ResetPassword';
import ListBusiness from './screens/ListBusiness';
import ListContacts from './screens/ListContacts';
import UserProfile from './screens/UserProfile';
import EditUserProfile from './screens/EditUserProfile';
import UserPosts from './screens/UserPosts';
import Map from './screens/Map';
import BusinessProfile from './screens/BusinessProfile';
import EditBusinessProfile from './screens/EditBusinessProfile';
import BusinessMentions from './screens/BusinessMentions';
import Posts from './screens/Posts';
import CustomerMenu from './screens/CustomerMenu';
import CustomerMenus from './screens/CustomerMenus';
import BusinessMenu from './screens/BusinessMenu';
import BusinessMenus from './screens/BusinessMenus';
import TabNavigator from './navigation/TabNavigator';
import UserType from './screens/UserType';

// const Tab = createBottomTabNavigator();

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
        name="BusinessMenus"
        component={BusinessMenus}
      />
      <Stack.Screen
        name="BusinessMenu"
        component={BusinessMenu}
      />
      <Stack.Screen
        name="Posts"
        component={Posts}
      <Strack.Screen
        name="UserType"
        component={UserType}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

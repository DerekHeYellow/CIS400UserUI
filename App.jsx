import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
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
import BusinessMentions from './screens/BusinessMentions';
import Menu from './screens/Menu';
import Posts from './screens/Posts';

// const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen
        name="ListBusiness"
        component={ListBusiness}
      />
      <Stack.Screen
        name="ListContacts"
        component={ListContacts}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
      />
      <Stack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
      />
      <Stack.Screen
        name="UserPosts"
        component={UserPosts}
      />
      <Stack.Screen
        name="BusinessProfile"
        component={BusinessProfile}
      />
      <Stack.Screen
        name="BusinessMentions"
        component={BusinessMentions}
      />
      <Stack.Screen
        name="Map"
        component={Map}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
      />
      <Stack.Screen
        name="Posts"
        component={Posts}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

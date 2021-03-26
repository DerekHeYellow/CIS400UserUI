import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ResetPassword from './screens/ResetPassword';

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
        name="UserType"
        component={UserType}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

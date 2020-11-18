import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ResetPassword from './screens/ResetPassword';



const Stack = createStackNavigator();

const App = () => {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ResetPassword from './screens/ResetPassword';
import FindBusiness from './screens/FindBusiness';
import ListContacts from './screens/ListContacts';
import UserProfile from './screens/UserProfile';
import Map from './screens/Map';



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
        <Stack.Screen
          name="FindBusiness"
          component={FindBusiness}
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
          name="Map"
          component={Map}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
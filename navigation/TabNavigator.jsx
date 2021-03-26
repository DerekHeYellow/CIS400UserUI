/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BusinessStackNavigator from './BusinessStackNavigator';
import PostsStackNavigator from './PostsStackNavigator';
import PeopleStackNavigator from './PeopleStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';

const Tab = createBottomTabNavigator();

function TabNavigator({ route, navigation }) {
  return (
    <SafeAreaProvider style={styles.container}>
      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainer}
        initialRouteName="Home"
        tabBarOptions={{
          labelStyle: styles.bottomNavLabel,
          tabStyle: styles.bottomNavTabItem,
          activeTintColor: '#2B2D42',
          style: styles.bottomNav,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarStyle: styles.bottomNavTabItem,
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Businesses"
          component={BusinessStackNavigator}
          options={{
            tabBarStyle: styles.bottomNavTabItem,
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <Icon
                name="briefcase-search"
                color={color}
                size={26}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Posts"
          component={PostsStackNavigator}
          options={{
            tabBarStyle: styles.bottomNavTabItem,
            tabBarLabel: 'Posts',
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color, size }) => (
              <Icon name="comment-text-multiple" color={color} size={25} />
            ),
          }}
        />

        <Tab.Screen
          name="People"
          component={PeopleStackNavigator}
          options={{
            tabBarStyle: styles.bottomNavTabItem,
            tabBarLabel: 'People',
            tabBarIcon: ({ color, size }) => (
              <Icon
                name="account-multiple"
                color={color}
                size={30}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileStackNavigator}
          initialParams={{ username: route.params.username }}
          options={{
            tabBarStyle: styles.bottomNavTabItem,
            tabBarLabel: 'Profile',
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color, size }) => (
              <Icon name="account-circle" color={color} size={29} />
            ),
          }}
        />

      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomNavTabItem: {
    top: 15,
    height: 50,
  },
  bottomNav: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 96,
    borderTopWidth: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});

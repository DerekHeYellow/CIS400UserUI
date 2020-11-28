import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList, TouchableOpacity } from 'react-native';
import Constants from "expo-constants";


const Menu = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{fontFamily: 'sans-serif-medium', fontSize: 25, color: "#003049", marginTop: 10}}>{title}</Text>
      )}
    />
  </SafeAreaView>
  )
}

const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza ($4)", "Burger ($4)", "Risotto ($6)"]
  },
  {
    title: "Sides",
    data: ["French Fries ($2)", "Onion Rings ($3)", "Fried Shrimps ($5)"]
  },
  {
    title: "Drinks",
    data: ["Water ($1)", "Coke ($1.50)", "Beer ($2)"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake ($4)", "Ice Cream ($2)"]
  }
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={{fontFamily: 'sans-serif', fontSize: 15, color: "#003049"}}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 20
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginVertical: 4
  },
  header: {
    fontSize: 32
  },
  title: {
    fontSize: 24
  }
});

export default Menu;
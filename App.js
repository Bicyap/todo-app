/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import Todo from './page/todo';

const App: () => Node = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Todo />
    </SafeAreaView>
  );
};

export default App;

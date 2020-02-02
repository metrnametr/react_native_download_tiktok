import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider, DefaultTheme } from 'react-native-paper';

import { AppLoading } from 'expo';

import * as Font from 'expo-font';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import {
  de,
  en,
  es,
  fr,
  it,
  ja,
  pt,
  ru,
  zh,
} from './config/language';

// import { theme } from './theme';

import AppNavigator from './src/navigation/AppNavigator';

const THEME = {
  ...DefaultTheme,
  colors: {
    // primary: '#ec407a',
    primary: '#fe2c55',
    primaryLight: '#ff77a9',
    primaryDark: '#b4004e',
    text: 'black',
    disabled: 'white',
    // placeholder: 'white'
  }
};


i18n.fallbacks = true;
i18n.translations = {
  de,
  en,
  es,
  fr,
  it,
  ja,
  pt,
  ru,
  zh,
};

i18n.locale = Localization.locale;
console.log(i18n.locale)

const loadFont = async () => {
  await Font.loadAsync({
    // 'Ionicons': require('./assets/Ionicons.ttf'),
    // 'MaterialIcons': require('./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
    // 'roboto-light': require('./assets/RobotoCondensed-Light.ttf'),
    // 'roboto-regular': require('./assets/RobotoCondensed-Regular.ttf'),
    // 'roboto-bold': require('./assets/RobotoCondensed-Bold.ttf'),
  });
  // const RN = require('react-native-ffmpeg');
  // console.log(RN)
};

const App = () => {
  const [loading, setLoading] = useState(true);
  

  if (loading) {
    return <AppLoading startAsync={ loadFont } onFinish={ () => setLoading(false) } />;
  }
  // console.log(AppNavigator);
  return (
    <View style={ { flex: 1 } }>
      <Provider theme={ THEME }>
        <AppNavigator />
      </Provider>
    </View>
  );
};
 

const styles = StyleSheet.create({
  container: {

  }
});

export default App;
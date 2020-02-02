import React from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import i18n from 'i18n-js';
import MainScreen from '../screens/MainScreen';
import DownloadedScreen from '../screens/DownloadedScreen';

// import CreateBankScreen from '../screens/CreateBankScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';



// import { theme } from '../../theme';


const config = Platform.select({
  // web: { headerMode: 'screen' },
  default: {},
});

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: ({ navigation }) => ({
        // headerLeft:(<Button onPress={() => navigation.openDrawer()} title="qwe" />),
        // header: null
      })
    },
  },
  {
    ...config,
    initialRouteName: 'Main',
    title: 'asdasd',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'white'
      },
      title: i18n.t('main.title')
    }
  }
);



MainStack.navigationOptions = {
  tabBarLabel: i18n.t('main.title'),
  tabBarIcon: ({ focused }) => (
    <Icon
      // focused={focused}
      name="download"
      color="white"
      size={ 24 }
    />
  ),
  activeColor: 'white',
  barStyle: {
    // backgroundColor: 'white'
  }
};

MainStack.path = '';

const DownloadedStack = createStackNavigator({
  Downloaded: {
    screen: DownloadedScreen,
    navigationOptions: () => ({
      // header: null,
    }),
  },
  VideoPlayer: {
    screen: VideoPlayerScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '',
      headerStyle: {
        // backgroundColor: 'transparent'
        // position: 'absolute',
        backgroundColor: 'transparent',
        // zIndex: 100,
        // top: 0,
        // left: 0,
        // right: 0,
        // elevation: 0,
        // shadowOpacity: 0,
        // borderBottomWidth: 0,
      },
      headerTransparent: true,
      headerLeft: null,
      headerRight: () => (
        <View style={ { padding: 10 } }>
          <TouchableOpacity onPress={ () => navigation.goBack() }>
            <EvilIcon name="close" size={ 30 } color="white" />
          </TouchableOpacity>
        </View>
      ),
      headerLeftContainerStyle: {
        color: 'white'
      },
      headerBackTitleStyle: {
        color: 'white'
      }
    })
  }
}, 
{
  ...config,
  initialRouteName: 'Downloaded', 
  defaultNavigationOptions: {
    headerStyle: {
      // backgroundColor: 'white'
    },
    title: i18n.t('downloaded.title'),
  }
}
);

DownloadedStack.navigationOptions = ({ navigation, focused }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: i18n.t('downloaded.title'),
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    tabBarIcon: () => (
      <Icon
        // focused={focused}
        name="file-video-o"
        color="white"
        size={ 24 }
      />
    ),
    tabBarVisible,
    activeColor: 'white',
    barStyle: {
      // backgroundColor: 'white'
    },
  };
};


DownloadedStack.path = '';

const FavoriteStack = createStackNavigator(
  {
    Favorite: {
      screen: FavoriteScreen,
      navigationOptions: ({ navigation }) => ({
        // headerLeft:(<Button onPress={() => navigation.openDrawer()} title="qwe" />),
        // header: null
      })
    },
  },
  {
    // ...config,
    initialRoute: 'Favorite',
    title: 'asdasd',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'white'
      },
    }
  }
);



FavoriteStack.navigationOptions = {
  tabBarLabel: 'Favorite',
  tabBarIcon: ({ focused }) => (
    <Icon
      // focused={focused}
      name="star-o"
      color="white"
      size={ 24 }
    />
  ),
  activeColor: 'white',
  barStyle: {
    // backgroundColor: 'white'
  }
};

FavoriteStack.path = '';

const MainTabNavigator =  createMaterialBottomTabNavigator({
  Main: { screen: MainStack },
  Downloaded: { screen: DownloadedStack },
  Favorite: { screen: FavoriteStack }
}, {
  shifting: true
});

export default MainTabNavigator;

import React, { Component } from 'react';
import { AppRegistry, Dimensions, View } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import SideMenu from '../containers/SideMenu';
import MainStack from './MainTabNavigator';



const CustomDrawerContentComponent = props => (
  <View>
    <DrawerItems { ...props } />
  </View>
);

// console.log(createDrawerNavigator, 'NAVIGATOR')
const AppDrawer = createDrawerNavigator({
  Main: {
    screen: MainStack
  }
}, {
  contentComponent: (props) =>  <SideMenu { ...props } />,
//   drawerWidth: Dimensions.get('window').width - 120,  
});

export default AppDrawer;
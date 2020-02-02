import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import AppVideoPlayer from '../components/AppVideoPlayer';


const VideoPlayerScreen = (props) => {
  const { navigation: { state } } = props;
  const { params: { uri } } = state;
  return (
    <AppVideoPlayer uri={ uri }/>
  );
};

export default VideoPlayerScreen;
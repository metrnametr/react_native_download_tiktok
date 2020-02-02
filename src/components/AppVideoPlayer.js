import React from 'react';
import { View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
//: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
const AppVideoPlayer = (props) => {
  const { uri, theme } = props;
  const { colors } = theme;
  console.log(uri);
  return (
    <View>
      <VideoPlayer
        videoProps={ {
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri
          },
        } }
        pauseIcon={ () => <Icon style={ { alignSelf: 'center' } } color="white" name="pause" size={ 40 } /> }
        playIcon={ () => <Icon style={ { alignSelf: 'center' } } color="white" name="play-circle-outline" size={ 40 } /> }
        inFullscreen={ true }
        sliderColor={ colors.primary }
        switchToPortrait={ () => console.log('dont work') }
      />
    </View>
  );
};

export default withTheme(AppVideoPlayer);
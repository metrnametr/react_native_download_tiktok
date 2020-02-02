import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, Share } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';


const ImageThumbnailVideo = (props) => {
  const { style, uri, id, theme, onPlay, videoUri, videoItem } = props;

  const { colors } = theme;
  const onShare = async () => {
    try {
      // console.log(videoUri);
      const result = await Share.share({
        message: 'Share vide12o',
        url: videoUri,
        type: 'video/mp4',
      },{

      });
    
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ImageBackground  source={ { uri } } style={ { ...style, ...styles.container } }>
      <View style={ styles.dots }>
        <TouchableOpacity>
          <Icon style={ styles.settingIcon } name="star-border" size={ 24 } color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={ onShare }>
          <Icon style={ styles.settingIcon } name="share" size={ 24 } color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon style={ styles.settingIcon } name="delete" size={ 24 } color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={ onPlay }>
        <Icon 
          size={ 42 }
          color="white"
          name="play-circle-outline"
          style={ { alignSelf: 'center', borderRadius: 21 } } 
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({  
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10
    // flexWrap: 'wrap'
  },
  dots: { 
    width: '100%',
    alignSelf: 'flex-end',
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(1, 1, 1, .5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 50
  },
  settingIcon: {
    padding: 5
  }
});

export default withTheme(ImageThumbnailVideo);
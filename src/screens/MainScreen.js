import React, { Component, useState, useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
// import Video from 'react-native-video';
import { Video } from 'expo-av';
import { parse } from 'node-html-parser';
import * as MediaLibrary from 'expo-media-library';

import * as Permissions from 'expo-permissions';
import UserAgent from 'random-useragent';

// import VideoPlayer from 'react-native-video-player';
import LaunchForm from '../containers/LaunchForm';
// import { LinearGradient } from 'expo-linear-gradient';
import ProgressLine from '../components/ProgressLine';

const MainScreen = () => {
  const [ progress, setProgress ] = useState(null);
  const [ uriVideo, setUriVideo ] = useState('');
  const [ downloadUrl, setDownloadUrl ] = useState('');
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    // fetchVideo();
  }, []);

  const fetchVideo = async () => {
    const newLink = await fetchData();
    setLoading(true);
    setDownloadUrl('');
    // console.log(newLink, 'NEW LINJ')
    const downloadResumable = FileSystem.createDownloadResumable(
      `${newLink}`,
      FileSystem.documentDirectory + `${Date.now()}.mp4`,
      {},
      callback
    );
    try {
      const video = await downloadResumable.downloadAsync();
      const { uri } = video;
      // console.log(video)
      const data = await saveFile(uri);
      Alert.alert('Dowland success');
      setUriVideo(data.uri);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const saveFile = async (fileUri) => {
    // PermissionsAndroid.
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // console.log(status, 'status')
    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const res = await MediaLibrary.createAlbumAsync('expo', asset);
      return asset;
    }
  };

  const fetchData = async () => {
    const post = await axios.get(downloadUrl, {
      headers: {
        'User-Agent': UserAgent.getRandom()
      }
    });
    const root = parse(post.data);
    const rootParse = root.querySelector('.video-player');
    const dataItemLink = rootParse.attributes.src;
    return dataItemLink;
  };
  const callback = (downloadProgress) => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setProgress(progress);
  };
  return (
    <View style={ styles.container }>
      <ProgressLine progress={ progress } start={ loading } />
      <LaunchForm value={ downloadUrl } onChange={ setDownloadUrl } onFetch={ fetchVideo } loading={ loading } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

export default MainScreen;

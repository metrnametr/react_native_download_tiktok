import React, { useEffect, useState } from 'react';
import { View, StyleSheet, RefreshControl, FlatList, SafeAreaView } from 'react-native';
import { Text, TextInput, Button, FAB, withTheme, ActivityIndicator, RadioButton, Portal } from 'react-native-paper';

import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
import * as VideoThumbnails from 'expo-video-thumbnails';

import ImageThumbnailVideo from '../components/ImageThumbnailVideo';
import { TouchableOpacity } from 'react-native-gesture-handler';
// console.log(RNFFmpeg)

const offset = 3;

const DownloadedScreen = (props) => {
  const { navigation, theme } = props;
  const { colors } = theme;
  const [ refreshing, setRefreshing ] = useState(false);
  const [ videos, setVideos ] = useState([]);
  const [ assetsImage, setAssetsImage ] = useState([]);
  const [ countLoad, setCountLoad ] = useState(0);
  const [ start, setStart ] = useState(0);
  const [ cutLoad, setCutLoad ] = useState(false);

  useEffect(() => {
    getVideos();
    
  }, []);

  useEffect(
    () => {
      if (videos.length) {
        cutVideos();
      }
    },
    [ start ]
  );

  useEffect(
    () => {
      cutVideos();
    },
    [ videos, countLoad ]
  );

  const toggleCheck = (id) => {
    const assets = assetsImage.map((item) => (item.id === id ? { ...item, check: !item.check } : item));
    setAssetsImage(assets);
  };

  const toggleScrollLoad = async () => {
    if (start + offset < countLoad) {
      setStart(start + offset);
    }
  };
  const getVideos = async () => {
    setRefreshing(true);
    await fetchVideos();
    setRefreshing(false);
  };

  const fetchVideos = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const { assetCount, id } = await MediaLibrary.getAlbumAsync('expo');
      const { assets } = await MediaLibrary.getAssetsAsync({
        first: assetCount,
        mediaType: [ MediaLibrary.MediaType.video ],
        album: id
      });
      setCountLoad(assetCount);
      if (videos.length != assets.length)
        setVideos((prev) => {
          if (prev.length !== assets) {
            return [ ...assets ].reverse();
          } else {
            return [ ...prev ];
          }
        });
    }
  };
  const cutVideos = async () => {
    setCutLoad(true);
    const end = start + offset > countLoad ? countLoad : start + offset;
    const videosItems = videos.slice(start, countLoad);
    const images = await Promise.all(
      videosItems.map(async (video) => {
        const { uri } = await VideoThumbnails.getThumbnailAsync(video.uri, {
          time: 15000
        });
        return uri;
      })
    );
    const assetsVideo = videosItems.map((video, i) => {
      return {
        ...video,
        thumbnailImage: images[i],
        check: false
      };
    });
    setAssetsImage((prev) => {
      const newState = new Set([ ...prev, ...assetsVideo ]);
      return [ ...newState ];
    });
    setCutLoad(false);
  };
  const assetsCheck = assetsImage.some((it) => it.check);
  return (
  //      <ScrollView
  // refreshControl={
  //     <RefreshControl refreshing={refreshing} onRefresh={getVideos} />
  //   }
  //   >
    <SafeAreaView style={ styles.container }>
      {/* <Image style={{ width: 150, height: 150, borderColor: 'black', borderWidth: .5}} source={{ uri: 'https://pixlr.com/photo/image-design-11-1-pw.jpg' }} /> */}
      {/* {
               assetsImage.length ? assetsImage.map( ({ thumbnailImage, uri, id }) => (
                    
                <ImageThumbnailVideo 
                    onPlay={() => navigation.navigate('VideoPlayer', {
                        uri
                    })}
                    style={styles.video} 
                    key={id} 
                    uri={thumbnailImage}
                    id={id}
                />))
                :
                null
            } */}
      {assetsImage.length ? (
        <FlatList
          style={ { flex: 1, paddingHorizontal: 10, marginTop: 10 } }
          data={ assetsImage }
          scroll
          scrollsToTop={ true }
          refreshControl={ <RefreshControl refreshing={ refreshing } onRefresh={ getVideos } /> }
          onEndReachedThreshold={ 0.9 }
          onEndReached={ () => {
            console.log('fired'); // keeps firing
            // toggleScrollLoad();
          } }
          renderItem={ ({ item }) => (
            <View style={ { width: '100%', flexDirection: 'row', justifyContent: 'space-between' } }>
              <View style={ { width: assetsCheck ? '85%' : '100%' } }>
                {/* <TouchableOpacity onLongPress={ () => toggleCheck(item.id) }> */}
                <ImageThumbnailVideo
                  onPlay={ () =>
                    navigation.navigate('VideoPlayer', {
                      uri: item.uri
                    }) }
                  style={ styles.video }
                  key={ item.id }
                  uri={ item.thumbnailImage }
                  videoUri={ item.uri }
                  id={ item.id }
                  videoItem={ item }
                />
                {/* </TouchableOpacity> */}
              </View>
              {/* { assetsCheck ? <RadioButton color={ colors.primary } value="1" status={ item.check ? 'checked' : 'unchecked' } /> : null} */}
            </View>
          ) }
          keyExtractor={ (item) => item.id }
        />
      ) : null}
      {/* {cutLoad ? (
        <View style={ { padding: 10 } }>
          <ActivityIndicator color={ colors.primary } />
        </View>
      ) : null} */}
      {/* <Portal>
        <FAB.Group
          open={ assetsCheck }
          icon={ 'close' }
          // style={{ ...styles.fab }}
          color={ 'black' }
          actions={ [
            {
              icon: 'delete',
              onPress: () => console.log('Pressed add'),
              color: 'white',
              style: { backgroundColor: colors.primary }
            }
          ] }
          onStateChange={ ({ open }) => console.log(1) }
          onPress={ () => {
            // if (this.state.open) {
            // do something if the speed dial is open
            // }
          } }
        />
      </Portal> */}
    </SafeAreaView>
  // </ScrollView>
  //     <ScrollView
  //     // refreshControl={
  //     //     <RefreshControl refreshing={refreshing} onRefresh={getVideos} />
  //     //   }
  //     style={{ flex: 1}}>
  //         <View style={styles.container}>
  //     {videos.map(({id, uri}) => (
  //               <Video
  //                 key={id}
  //                 source={{ uri }}
  //                 rate={1.0}
  //                 volume={1.0}
  //                 isMuted={false}
  //                 resizeMode="cover"
  //                 shouldPlay={false}
  //                 isLooping
  //                 posterSource={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJsb-X3krAzduDC1d8QhNOm6U_sVYRZHf79JNgcRI2uK6GKmgv&s'}}
  //                 // usePoster={true}
  //                 style={styles.video}
  //               />
  //     ))
  // }
  //     </View>
  //     </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
    // padding: 15,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between'
  },
  video: { width: '48%', height: 250, marginBottom: 10 },
  fab: {
    position: 'absolute',
    margin: 5,
    marginBottom: 40,
    right: 0,
    bottom: 0
  }
});

export default withTheme(DownloadedScreen);

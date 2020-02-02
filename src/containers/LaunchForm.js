import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Clipboard, TouchableOpacity } from 'react-native';
import { Text,TextInput, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';

import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import i18n from 'i18n-js';

const LaunchForm = (props) => {
  const { value, onChange, onFetch, loading, theme } = props;
  const { colors } = theme;
  const [clipboard, setClipboard] = useState('');
  useEffect(() => {
    getClipboard();
  },[]);
  const getClipboard = async () => {
    const clipboard = await Clipboard.getString();
    setClipboard(clipboard);
  };
  const toggleClipboard = () => {
    onChange(clipboard);
    console.log(clipboard);
  };
  const clearValue = () => {
    onChange('');
  };
  return (
    <View style={ styles.container }>
      <View style={ { marginBottom: 10, flexDirection: 'row' } }>
        <TextInput 
          value={ value }
          onChangeText={ onChange }
          style={ styles.textInput }
          label={ i18n.t('main.videoURL') }
          placeholder="Link on Video"
          underlineColor="black"
        />
        {
          (clipboard && !value) ? 
            <View style={ styles.icon }>
              <TouchableOpacity onPress={ toggleClipboard }>
                <IconFeather name="copy" size={ 20 } />
              </TouchableOpacity>
            </View>
            : (value) ? 
              <View style={ styles.icon }>
                <TouchableOpacity onPress={ clearValue }>
                  <IconMaterialIcons name="clear" size={ 20 } />
                </TouchableOpacity>
              </View>
              : null
        }
      </View>
      <View style={ styles.buttons }>
        <Button style={ {
          ...styles.button,
          backgroundColor: colors.primary,
                    
        } }
          disabled={ loading }
          color="white"
        >{i18n.t('main.btnOpen')}</Button>
        <Button style={ {
          ...styles.button,
          backgroundColor: colors.primary,
                    
        } }
          disabled={ loading }
          color="white"
        onPress={ onFetch }
        >{i18n.t('main.btnDownload')}</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '45%'
  },
  textInput: {
    backgroundColor: 'transparent',
    color: 'white',
    width: '90%'
  },
  icon: { flexDirection: 'row', width: '10%', alignItems: 'center', justifyContent: 'center', marginBottom: .7 }
});

export default withTheme(LaunchForm);
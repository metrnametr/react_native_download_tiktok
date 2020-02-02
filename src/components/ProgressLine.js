import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Animated, Easing, ProgressBarAndroid } from 'react-native';
import { withTheme } from 'react-native-paper';
const ProgressLine = (props) => {
  // const [progress, setProgress] = useState();
  const { start, progress = 0, theme } = props;
  const { colors: { primary } } = theme;
  return (
    <View style={ styles.container }>
      {
        start ? 
          <View style={ styles.container }>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={ false }
              progress={ progress }
              color={ primary }
              style={ { width: '100%' } }
            />
            <Text>{Math.round(progress * 100)}%</Text>
          </View>
          :
          <Text></Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  progressLine: {
    width: '100%',
    // height: 5,
    backgroundColor: 'black',
    borderRadius: 2,
    marginBottom: 3
  }
});

export default withTheme(ProgressLine);
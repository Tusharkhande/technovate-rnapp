import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function Spinner() {
  return (
    <View style={styles.spinnercontainer}>
      <Image source={require('./spinner.gif')} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnercontainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: 10,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // zIndex:-1,
  },
  spinner: {
    width: 100,
    height: 100,
  },
});
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
    backgroundColor: '#fff',
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  spinner: {
    width: 100,
    height: 100,
  },
});
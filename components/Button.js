import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Button({ title, onPress, image }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    text: {
        color: '#f1f1f1',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 15
    },
  image: {
    width: 35,
    height: 35,
    // marginLeft: 15,
    justifyContent: 'center'
    // padding: 20
  },
  
});

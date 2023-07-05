import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import logo from '../images/logo.png';

const Header = ({ toggleAbout, children }) => {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.title}>{children}</Text>
      {(children === 'Home' || children === 'About') && (
        <TouchableOpacity style={styles.touch} onPress={toggleAbout}>
          <Image style={styles.img} source={require('../images/about2.png')} />
        </TouchableOpacity>
      )}
      {!(children === 'Home' || children === 'About') &&
        <View style={styles.empty}></View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#003249',
    height: 100,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#80CED7',
  },
  touch: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    padding: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  text: {
    color: '#80CED7',
    marginLeft: 5,
  },
  empty:{
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 80,
    paddingLeft:80,
  }
});

export default Header;
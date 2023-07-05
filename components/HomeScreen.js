import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Image } from 'react-native';
import Button from './Button';
import BottomNavigation from './BottomNavigation';
import logo from '../images/logo.png';
import Header from './Header';

export default function HomeScreen({ toggleCamera, toggleWifiList, toggleHome, toggleContact, toggleAbout }) {
    const camImg = require('../images/camera.png');
    //write code for a hamburger menu that will navigate to the other screens




    return (
        <View style={styles.container}>
            {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
            {/* <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
            </View> */}
            <Header toggleAbout={toggleAbout} children="Home" />

            <Text style={styles.maintext}>Open Scanner</Text>
            <Button image={camImg} onPress={() => toggleCamera()} />
            <View style={styles.bottom}>
                <BottomNavigation toggleWifiList={toggleWifiList} toggleHome={toggleHome} toggleContact={toggleContact} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007EA7',
    },
    maintext: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 200,
        marginBottom: 20,
        color: '#fff',
    },
    textinput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: '#fff',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        // marginBottom: 20,
    },
});

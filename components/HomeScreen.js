import React, { useState } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import Button from './Button';

export default function HomeScreen({ toggleCamera }){
    const camImg = require('../images/camera.png');
    // const wv = require('../images/wv.png');
    // const isIpAddressEmpty = ipAddress.trim() === '';

    return (
        <>
            <Text style={styles.maintext}>Scan QR code to connect to WiFi</Text>
            <Button image={camImg} onPress={() => toggleCamera()} />
{/* 
            <Text style={styles.maintext}>Or enter IP address manually</Text>   
            <TextInput
                style={styles.textinput}
                onChangeText={text => setIpAddress(text)}
                placeholder="Enter IP address"
            />
            <Button disabled={isIpAddressEmpty} title='Go' image={wv} onPress={() => setShowWebview(true)} /> */}
        </>
    );
}

const styles = StyleSheet.create({
    maintext: {
        fontSize: 16,
        margin: 20,
        color: '#fff',
      },
        textinput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: '#fff',
        },
});

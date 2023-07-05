import React, { useState, useEffect } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { StyleSheet, Text, View, BackHandler, Alert, ToastAndroid, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Button from './Button';
import wifi from 'react-native-android-wifi';
import { NetworkInfo } from "react-native-network-info";
import WifiManager from 'react-native-wifi-reborn';
import BottomNavigation from './BottomNavigation';
import Header from './Header';

export default function QRCodeScannerComp({ toggleContact, toggleHome, toggleWifiList, password, setPassword, isWifiEnabled, isLocationEnabled, setIsLoading, setIpAddress, showWebView, setShowWebView, toggleCamera, scanned, setScanned, checkLocationStatus, checkWifiStatus, isConnected, currentSSID, setCurrentSSID, setIsConnected }) {
    const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
    const [text, setText] = useState('Not yet scanned');
    const [ssid, setSsid] = useState('');
    const [isHidden, setIsHidden] = useState('');
    const retake = require('../images/retake.png');
    const cancel = require('../images/cancel.png');
    const flashOn = require('../images/flash.png');
    const flashOff = require('../images/flash-off.png');
    const wifion = require('../images/wifion.png');
    const openWV = () => {
        NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
            console.log(defaultGateway);
            setIpAddress(defaultGateway);
        });
        setShowWebView(true);
    };

    const handleBackButton = () => {
        toggleCamera();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Clean up the event listener when the component unmounts
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);

    const disconnectFromWifi = () => {
        wifi.disconnect();
        const disconnect = WifiManager.disconnect();
        if (disconnect) {
            ToastAndroid.show('Disconnected successfully', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('Error in disconnecting', ToastAndroid.SHORT);
        }
        setIsConnected(false);
    };

    function getErrorMessage() {
        if (!isWifiEnabled && !isLocationEnabled) {
            return 'Wifi and location are disabled!\nPlease Turn on Wifi and Location';
        } else if (!isWifiEnabled) {
            return 'Wifi is disabled!\n Please Turn on Wifi';
        } else if (!isLocationEnabled) {
            return 'Location is disabled!\n Please Turn on Location ';
        } else {
            return 'Wifi is not in range';
        }
    }

    const ifConnected = () => {
        setIsConnected(true);
        setTimeout(() => {
            NetworkInfo.getGatewayIPAddress().then((defaultGateway) => {
                console.log(defaultGateway);
                setIpAddress(defaultGateway);
            });
        }, 1500);
        setShowWebView(true);
        console.log("Connected successfully");
        setIsLoading(false);
        setTimeout(() => {
            WifiManager.getCurrentWifiSSID().then(
                currSsid => {
                    console.log("Your current connected wifi SSID is " + currSsid);
                    setCurrentSSID(currSsid);
                },
                () => {
                    console.log("Cannot get current SSID!");
                }
            );
        }, 2000);
    }

    const connectToWifi = async (ssid, password, isHidden) => {
        try {
            if (!ssid || !password) {
                console.log(ssid, password);
                console.log('SSID or password is null');
                return;
            }
            console.log('Connecting to wifi...');
            setIsLoading(true);
            WifiManager.connectToProtectedSSID(ssid, password, false, isHidden).then(
                () => {
                    console.log("Connected successfully!");
                    ifConnected();
                },
                () => {
                    console.log("Connection failed!");
                    console.log("wifi is not in range");
                    setScanned(false);
                    Alert.alert(
                        'Error',
                        getErrorMessage(),
                        [
                            { text: 'OK', onPress: () => { setIsLoading(false); } }
                        ]
                    );
                }
            );

        } catch (error) {
            console.log('Connection failed!');
            console.error(error);
        }
    };

    const toggleFlash = () => {
        setFlash(
            flash === RNCamera.Constants.FlashMode.off
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off,
        );
    };

    const handleBarCodeScanned = ({ data }) => {
        try {
            console.log('first');
            if (!scanned) {

                console.log('first');
                wifi.getSSID((ssid) => {
                    console.log(ssid);
                });
                checkLocationStatus();
                checkWifiStatus();

                setScanned(true);
                setText(data);
                console.log(data);

                let ssid = null;
                let password = null;
                let isHidden = null;

                let regex = /WIFI:T:(.*?);S:(.*?);P:(.*?);H:(.*?);/;
                let match = data.match(regex);
                if (match) {
                    ssid = match[2];
                    password = match[3];
                    isHidden = match[4] === 'true';
                }

                regex = /WIFI:S:(.*?);T:(.*?);P:(.*?);H:(.*?);/;
                match = data.match(regex);
                if (match) {
                    ssid = match[1];
                    password = match[3];
                    isHidden = match[4] === 'true';
                }

                if (ssid !== null && password !== null && isHidden !== null) {
                    setSsid(ssid);
                    setPassword(password);
                    setIsHidden(isHidden);
                }

                if (isConnected && ssid === currentSSID) {
                    Alert.alert(
                        'Already Connected',
                        `You are already connected to ${currentSSID}`,
                        [
                            { text: 'Cancel', },
                            { text: 'Proceed', onPress: () => openWV() },
                        ],
                    );
                }
                else if (isConnected && ssid !== currentSSID) {
                    console.log("connected");
                    Alert.alert(
                        'Already Connected to another network',
                        `${currentSSID}`,
                        [
                            { text: 'Cancel', },
                            { text: 'Disconnect', onPress: () => disconnectFromWifi() },
                        ],
                    );
                }
                if (!isConnected) {
                    Alert.alert(
                        'SSID and Password',
                        `SSID: ${ssid}\nPassword: ${password}`,

                        [
                            { text: 'Cancel', onPress:setScanned(false) },
                            { text: 'Connect', onPress: () => connectToWifi(ssid, password, isHidden) },
                        ],
                    );
                }

                // NetInfo.fetch().then(state => {
                //   // `Connection Type: ${state.type}\nIs Connected? ${state.isConnected}`

                //   console.log('Connection type', state.type);
                //   console.log('Is connected?', state.isConnected);
                //   console.log(state.details.ipAddress);
                // });

                // console.log(ssid);
                // console.log(password);
                setScanned(false);
            }
        } catch (error) {
            console.error(`Error handling scanned barcode: ${error}`);
            setScanned(false);
            setText('Error handling barcode');
        }
    }


    return (
        <>
            <Header children='Scanner'/>
            <View style={styles.barcodebox}>
                <QRCodeScanner
                    onRead={handleBarCodeScanned}
                    flashMode={flash}></QRCodeScanner>
                <View style={styles.flashButtonContainer}>
                    <Button
                        onPress={toggleFlash}
                        image={
                            flash === RNCamera.Constants.FlashMode.off
                                ? flashOn
                                : flashOff
                        }
                        style={styles.flashButton}
                    />
                </View>
            </View>
            {!showWebView && <Text style={styles.maintext}>{text}</Text>}
            {scanned && (
                <Button
                    title={'Scan again?'}
                    image={retake}
                    onPress={() => { setScanned(false) }}
                    color="black"
                />
            )}
            <View style={styles.buttons}>
                <Button
                    title={'Cancel'}
                    image={cancel}
                    onPress={toggleCamera}
                />
            </View>
            <View style={styles.bottom}>
                <BottomNavigation toggleCamera={toggleCamera} toggleWifiList={toggleWifiList} toggleHome={toggleHome} toggleContact={toggleContact} />
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    barcodebox: {

        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: '#CCDBDC',
    },
    flashButtonContainer: {
        position: 'absolute',
        top: 3,
        left: 220,
        padding: 20,
        borderRadius: 20,
    },
    flashButton: {
        width: 24,
        height: 24,
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        color: '#fff',
    },
    buttons: {
        margin: 5,
        backgroundColor: '#003249',
        borderRadius: 10,
        padding: 10,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        // marginBottom: 20,
    },
});

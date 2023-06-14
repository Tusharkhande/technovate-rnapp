import React, { useState, useEffect, useRef } from 'react';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Button from './components/Button';
import { WebView } from 'react-native-webview';
import WifiManager from 'react-native-wifi-reborn';
import { NetworkInfo } from "react-native-network-info";
// import WifiManager from 'react-native-wifi';
import wifi from 'react-native-android-wifi';
import NetInfo from '@react-native-community/netinfo';
import Spinner from './components/Spinner';

const App = () => {
  const [scanned, setScanned] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [text, setText] = useState('Not yet scanned');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [currentSSID, setCurrentSSID] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  const [webViewError, setWebViewError] = useState(true);
  const [isWifiEnabled, setisWifiEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isHidden, setIsHidden] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const flashOn = require('./images/flash.png');
  const flashOff = require('./images/flash-off.png');
  const camImg = require('./images/camera.png');
  const retake = require('./images/retake.png');
  const cancel = require('./images/cancel.png');
  const back = require('./images/back.png');

  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      if (
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log('Error requesting location permission: ', error);
    }
  };

  const toggleWebView = () => {
    setShowWebView(!showWebView);
  };

  const connectToWifi = async (ssid, password) => {
    try {
      if (!ssid || !password) {
        console.log(ssid, password);
        console.log('SSID or password is null');
        return;
      }
      console.log('Connecting to wifi...');
      setIsLoading(true);
      wifi.findAndConnect(ssid, password, (found) => {
        if (found) {
          setIsConnected(true);
          setTimeout(() => {
            NetworkInfo.getGatewayIPAddress().then( (defaultGateway) => {
              console.log(defaultGateway);
              setIpAddress(defaultGateway);
            });
          }, 1000);
          setShowWebView(true);
          console.log("Connected successfully");
          setIsLoading(false);
          Alert.alert(
            'Success',
            'Connected successfully',
            [
              { text: 'OK'}
            ]
          );
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
        } else {
          console.log("wifi is not in range");
          Alert.alert(
            'Error',
            'Wifi is not in range',
            [
              { text: 'OK', onPress: () => { setIsLoading(false); } }
            ]
          );
        }
      });

    } catch (error) {
      console.log('Connection failed!');
      console.error(error);
    }
  };


  const disconnectFromWifi = () => {
    wifi.disconnect();
    setIsConnected(false);
  };

  const openWV = () => {
    NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
      console.log(defaultGateway);
      setIpAddress(defaultGateway);
    });
    setShowWebView(true);
  };

  const handleBarCodeScanned = ({ data }) => {
    try {
      console.log('first');
      if (!scanned) {

        console.log('first');
        wifi.getSSID((ssid) => {
          console.log(ssid);
        });

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
          console.log("first22222222222222222222", ssid, password, isHidden);
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
              { text: 'Cancel', },
              { text: 'Connect', onPress: () => connectToWifi(ssid, password) },
            ],
          );
        }

        NetInfo.fetch().then(state => {
          // `Connection Type: ${state.type}\nIs Connected? ${state.isConnected}`

          console.log('Connection type', state.type);
          console.log('Is connected?', state.isConnected);
          console.log(state.details.ipAddress);
        });

        console.log(ssid);
        console.log(password);

        // connectToWifi(ssid, password);
        setScanned(false);
      }
    } catch (error) {
      console.error(`Error handling scanned barcode: ${error}`);
      setScanned(false);
      setText('Error handling barcode');
    }
  }

  const checkWifiStatus = () => {
    wifi.connectionStatus((isConnected) => {
      if (isConnected) {
        WifiManager.getCurrentWifiSSID().then(
          currSsid => {
            setIsConnected(true);
            console.log("Your current connected wifi SSID is " + currSsid);
            setCurrentSSID(currSsid);
          },
          () => {
            console.log("Cannot get current SSID!");
          }
        ).catch((error) => {
          setIsConnected(false);
          setCurrentSSID(null);
          console.error(`Error getting current WiFi SSID: ${error}`);
        });
      } else {
        setIsConnected(false);
        setCurrentSSID(null);
      }
    });
  };

  useEffect(() => {
    permission();
    checkWifiStatus();
    wifi.connectionStatus((isConnected) => {
      if (isConnected) {
        setIsConnected(true);
        console.log("is connected");
      } else {
        console.log("is not connected");
      }
    });
    WifiManager.getCurrentWifiSSID().then(
      currSsid => {
        console.log("Your current connected wifi SSID is " + currSsid);
        setCurrentSSID(currSsid);
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
  }, []);


  const toggleCamera = () => {
    setIsCameraOpen(!isCameraOpen);
    setScanned(false);
  };

  const toggleFlash = () => {
    setFlash(
      flash === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.torch
        : RNCamera.Constants.FlashMode.off,
    );
  };


  const handleWebViewError = () => {
    setWebViewError(!webViewError);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>

      {showWebView ? (
        <View style={styles.webviewContainer}>
          {isLoading && (
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
          <WebView
            source={
              { uri: ipAddress }
            }
            style={styles.webview}
            androidHardwareAccelerationDisabled={false}
            androidLayerType="software"
            onNavigationStateChange={navState => {
              setCanGoBack(navState.canGoBack);
            }}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleWebViewError}
          />

          <View style={styles.buttons}>
            <Button
              title={'Go back'}
              image={back}
              onPress={() => {
                toggleWebView();
              }}
            />
          </View>
        </View>
      ) : isCameraOpen ? (
        <>
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
              onPress={() => setScanned(false)}
              color="black"
            />
          )}
          <View style={styles.buttons}>
            <Button
              title={'Cancel'}
              image={cancel}
              onPress={() => toggleCamera()}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.maintext}>Scan QR code to connect to WiFi</Text>
          <Button image={camImg} onPress={() => toggleCamera()} />
        </>
      )}
      {isLoading && <Spinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
    color: '#fff',
  },
  camera: {
    width: 300,
    height: 400,
    overflow: 'hidden',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
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

  scanButtonContainer: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    margin: 50,
  },

  webviewContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 10,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
  webview: {
    flex: 1,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  buttons: {
    marginTop: 5,
    backgroundColor: '#000',
    borderRadius: 20,
  },
});

export default App;

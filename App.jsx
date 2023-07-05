import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import wifi from 'react-native-android-wifi';
import Spinner from './components/Spinner.js';
import CustomWebView from './components/WebView';
import Geolocation from '@react-native-community/geolocation';
import HomeScreen from './components/HomeScreen.js';
import QRCodeScannerComp from './components/QRCodeScannerComp.js';
import SplashScreen from 'react-native-splash-screen';
import WifiList from './components/WifiList.js';
import AboutScreen from './components/AboutScreen.js';
import Contact from './components/Contact.js';
const App = () => {
  const [scanned, setScanned] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [currentSSID, setCurrentSSID] = useState('unknown');
  const [webViewError, setWebViewError] = useState(true);
  const [isWifiEnabled, setisWifiEnabled] = useState(false);
  const [isLocationEnabled, setisLocationEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wifiList, setWifiList] = useState(false);
  const [home, setHome] = useState(false);
  const [about, setAbout] = useState(false);
  const [contact, setContact] = useState(false);

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

  const checkLocationStatus = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log("Location services are enabled");
        console.log(position)
        setisLocationEnabled(true);
        // ToastAndroid.show('Location is enabled', ToastAndroid.SHORT);
      },
      error => {
        console.log("Location services are disabled");
        console.log(error);
        setisLocationEnabled(false);
        // ToastAndroid.show('Location is disabled', ToastAndroid.SHORT);
      },

    );
  };

  const checkWifiStatus = async () => {

    wifi.isEnabled((isEnabled) => {
      if (isEnabled) {
        console.log("wifi service enabled");
        // ToastAndroid.show('Wifi is Enabled', ToastAndroid.SHORT);
        setisWifiEnabled(true);
      } else {
        console.log("wifi service is disabled");
        // ToastAndroid.show('Wifi is Disabled', ToastAndroid.SHORT);
        setisWifiEnabled(false);
      }
    });

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
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    permission();
    checkWifiStatus();
    checkLocationStatus();
    console.log(ipAddress)
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

  const toggleWifiList = () => {
    setWifiList(!wifiList);
    setIsCameraOpen(false);
  };

  const toggleHome = () => {
    setHome(!home);
    setIsCameraOpen(false);
  };

  const toggleAbout = () => {
    setAbout(!about);
    setIsCameraOpen(false);
    setContact(false);
  };

  const toggleContact = () => {
    setContact(!contact);
    setIsCameraOpen(false);
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
        <CustomWebView
          ipAddress={ipAddress}
          isLoading={isLoading}
          handleLoadStart={handleLoadStart}
          handleLoadEnd={handleLoadEnd}
          handleWebViewError={handleWebViewError}
          toggleWebView={toggleWebView}
        />
      ) : isCameraOpen ? (
        <>
          <QRCodeScannerComp toggleAbout={toggleAbout} toggleHome={toggleHome} toggleContact={toggleContact} toggleWifiList={toggleWifiList} password={password} setPassword={setPassword} isLocationEnabled={isLocationEnabled} isWifiEnabled={isWifiEnabled} setIsLoading={setIsLoading} setIpAddress={setIpAddress} showWebView = {showWebView} setShowWebView={setShowWebView} toggleCamera={toggleCamera} scanned={scanned} setScanned={setScanned} checkLocationStatus={checkLocationStatus} checkWifiStatus={checkWifiStatus} isConnected={isConnected} currentSSID={currentSSID} setCurrentSSID={setCurrentSSID} setIsConnected={setIsConnected}/>
        </>
      ): wifiList ? (
      <>
        <WifiList toggleAbout={toggleAbout} isWifiEnabled={isWifiEnabled} isLocationEnabled={isLocationEnabled} toggleWifiList={toggleWifiList} setCurrentSSID={setCurrentSSID} setIsLoading={setIsLoading} setIsConnected={setIsConnected} setShowWebView={setShowWebView} setPassword={setPassword} password={password} setIpAddress={setIpAddress} ipAddress={ipAddress} />
      </>
      ) : contact ? (
        <Contact toggleWifiList={toggleWifiList} toggleHome={toggleHome}  toggleContact={toggleContact} />
      ) : about ? (
        <AboutScreen toggleAbout={toggleAbout} />
      ): (
        <HomeScreen toggleAbout={toggleAbout} toggleCamera={toggleCamera} toggleWifiList={toggleWifiList} toggleHome={toggleHome} toggleContact={toggleContact} />
      )}
      {isLoading && <Spinner />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007EA7',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 8,
    // borderRadius: 20,
  },
});

export default App;

import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, BackHandler, TextInput, Button, Modal, ToastAndroid } from 'react-native';
import wifi from 'react-native-android-wifi';
// import Wifi from './Wifi';
import WifiManager from "react-native-wifi-reborn";
import { NetworkInfo } from "react-native-network-info";
import Header from './Header';
import BottomNavigation from './BottomNavigation';


const WifiList = ({setModalVisible1, setScanned, currentSSID, isConnected, toggleContact, toggleHome, setWifiList, toggleWifiList, setShowWebView, setPassword, password, setIpAddress, isWifiEnabled, isLocationEnabled, setIsConnected, setCurrentSSID, setIsLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWifi, setSelectedWifi] = useState("");
  // const [password, setPassword] = useState('');


  function getErrorMessage() {
    if (!isWifiEnabled && !isLocationEnabled) {
      return 'Wifi and location are disabled!\nPlease Turn on Wifi and Location';
    } else if (!isWifiEnabled) {
      return 'Wifi is disabled!\n Please Turn on Wifi';
    } else if (!isLocationEnabled) {
      return 'Location is disabled!\n Please Turn on Location ';
    } else {
      return 'Wifi is not in range or wrong password!';
    }
  }

  const handleBackButton = () => {
    setWifiList(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const [wifiArray, setWifiArray] = useState([]);

  const loadWifiList = () => {
    wifi.loadWifiList(
      wifiStringList => {
        const parsedWifiArray = JSON.parse(wifiStringList);
        console.log(parsedWifiArray);
        setWifiArray(parsedWifiArray);
        if (parsedWifiArray.length === 0) {
          Alert.alert(
            'Error',
            getErrorMessage(),
            [
              { text: 'OK', onPress: () => { setIsLoading(false); } }
            ],
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  };

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

  const ifConnected = () => {
    setIsConnected(true);
    setIsLoading(true);
    setModalVisible(false);
    setTimeout(() => {
      NetworkInfo.getGatewayIPAddress().then((defaultGateway) => {
        console.log(defaultGateway);
        setIpAddress(defaultGateway);
      });
    }, 1500);
    // setShowWebView(true);
    setModalVisible1(true);
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
  };


  const connectToWifi = async () => {
    try {
      wifi.isRemoveWifiNetwork(selectedWifi, (isRemoved) => {
        console.log("Forgetting the wifi device - " + selectedWifi);
      });
      if (!selectedWifi || !password) {
        console.log(selectedWifi, password);
        console.log('SSID or password is null');
        return;
      }
      console.log('Connecting to wifi...');
      setIsLoading(true);
      setModalVisible(false);
      WifiManager.connectToProtectedSSID(selectedWifi, password, false, false).then(
        () => {
          console.log("Connected successfully!");
          ToastAndroid.show("Connected successfully!", ToastAndroid.SHORT);
          ifConnected();
        },
        () => {
          console.log("Connection failed!");
          console.log("Wifi is not in range");
          Alert.alert(
            'Error',
            getErrorMessage(),
            [
              { text: 'OK', onPress: () => { setIsLoading(false); } }
            ],
          );
        }
      );

    } catch (error) {
      console.log('Connection failed!');
      console.error(error);
      ToastAndroid.show("Connection failed!", ToastAndroid.SHORT);
    }
  };

  // const handleConnect = () => {
  //   if (isConnected && selectedWifi === currentSSID) {
  //     Alert.alert(
  //       'Already Connected',
  //       `You are already connected to ${currentSSID}`,
  //       [
  //         { text: 'Cancel', },
  //         { text: 'Proceed', onPress: () => openWV() },
  //       ],
  //     );
  //   }
  //   else if (isConnected && selectedWifi !== currentSSID) {
  //     console.log("connected");
  //     Alert.alert(
  //       'Already Connected to another network',
  //       `${currentSSID}`,
  //       [
  //         { text: 'Cancel', },
  //         { text: 'Disconnect', onPress: () => disconnectFromWifi() },
  //       ],
  //     );
  //   }
  //   if (!isConnected) {
  //     setModalVisible(true);
  //   }
  // }



  useEffect(() => {
    WifiManager.getCurrentWifiSSID().then(
      currSsid => {
        console.log("Your current connected wifi SSID is " + currSsid);
        setCurrentSSID(currSsid);
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
    wifi.connectionStatus((isConnected) => {
      if (isConnected) {
        setIsConnected(true);
        console.log("is connected");
      } else {
        console.log("is not connected");
      }
    });
  }, []);


  return (
    <>
      <Header children='Wifi List' />
      <View style={styles.container1}>
        <TouchableOpacity style={styles.touch} onPress={() => loadWifiList()}>
          <Text style={styles.text}>Load Wifi List</Text>
        </TouchableOpacity>

        {/* // <Wifi key={wf.SSID} ssid={wf.SSID} getErrorMessage={getErrorMessage} setShowWebView={setShowWebView} setIsConnected={setIsConnected} setPassword={setPassword} password={password} setCurrentSSID={setCurrentSSID} setIsLoading={setIsLoading} /> */}
        <View style={styles.container} >
          {wifiArray.map(wf => (
            <View key={wf.SSID} style={styles.row}>
              <Text style={fontSize = 24}>{wf.SSID}  </Text>
              <Button title="Connect" onPress={() => {
                setSelectedWifi(wf.SSID);
                console.log(selectedWifi);
                setModalVisible(true);
              }} />
            </View>
          ))}
        </View>
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Password :</Text>
              <TextInput
                style={styles.input}
                value={password}
                editable={true}
                onChangeText={(text) => setPassword(text)}
              />
              <View style={styles.buttonContainer}>
                <Button title="Connect" onPress={connectToWifi} />
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>

      </View>
      <View style={styles.bottom}>
        <BottomNavigation toggleWifiList={toggleWifiList} toggleHome={toggleHome} toggleContact={toggleContact} />
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#007EA7',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#fff',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  input: {
    width: 150,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    margin: 5,
    // borderBottomColor: '#ccc',
  },
});

export default WifiList;

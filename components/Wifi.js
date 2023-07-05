import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput,Button, Modal, ToastAndroid } from 'react-native';
import WifiManager from "react-native-wifi-reborn";
import NetworkInfo from "react-native-network-info";


const Wifi = ({ ssid,getErrorMessage,setShowWebView,setIsConnected,setCurrentSSID,setIsLoading }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [text1, setText1] = useState('');
    
    
    const ifConnected = () => {
        setIsConnected(true);
        setModalVisible(false);
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
    };
    useEffect(() => {
        setText1(ssid);
    }, [ssid]);

    const connectToWifi = async (text1, Dattebayo101) => {
        try {
            if (!ssid || !password) {
                console.log(ssid, password);
                console.log('SSID or password is null');
                return;
            }
            console.log('Connecting to wifi...');
            // setIsLoading(true);
            setModalVisible(false);
            WifiManager.connectToProtectedSSID(ssid, password, false, false).then(
                () => {
                    console.log("Connected successfully!");
                    ToastAndroid.show("Connected successfully!", ToastAndroid.SHORT);  
                    ifConnected();
                },
                () => {
                    console.log("Connection failed!");
                    console.log("wifi is not in range");
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
            ToastAndroid.show("Connection failed!", ToastAndroid.SHORT);
        }
    };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Password</Text>
            <TextInput
              style={styles.input}
              value= {password}
              editable={true}
              onChangeText={text => setPassword(text)}
            />
            <View style={styles.buttonContainer}>
            <Button title="Connect" onPress={connectToWifi} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.text}>{ssid}  </Text>
      <Button title="Connect" onPress={() => setModalVisible(true)} />
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 8,
      color: '#fff',
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
    },
  });

export default Wifi;

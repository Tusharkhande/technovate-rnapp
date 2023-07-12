import { View, Text,TextInput,Modal,StyleSheet } from 'react-native'
import Button from './Button';
import React from 'react'
import { NetworkInfo } from 'react-native-network-info';

export default function CustomModal({modalVisible1,setModalVisible1,setShowWebView,setIpAddress}) {
    const openWV = () => {
        NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
            console.log(defaultGateway);
            setIpAddress(defaultGateway);
        });
        setShowWebView(true);
        setModalVisible1(false);
    };
    const newIP = () => {
        setShowWebView(true);
        // setIsLoading(true);
        setModalVisible1(false);
    };
  return (
    <Modal visible={modalVisible1} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* <Text style={styles.modalText}>Open Current IP Address or Enter a New One?</Text> */}
                        <View style={styles.buttonContainer}>
                            <View style={styles.dummy} ></View>
                            <Button title="Open Current IP Address" onPress={openWV} />
                        </View>
                        <Text style={styles.modalText}>OR</Text>
                        <TextInput
                            style={styles.input}
                            editable={true}
                            onChangeText={(text) => setIpAddress(text)}
                            placeholder="Enter New IP Address"
                        />
                        <View style={styles.buttonContainer}>
                            <View style={styles.dummy} ></View>
                            <Button title="Proceed with the new IP" onPress={newIP} />
                        </View>
                    </View>
                </View>
            </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    },
    modalContent: {
        backgroundColor: '#007EA7',
        width: '80%',
        padding: 16,
        borderRadius: 8,
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 22,
        // textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#003249',
        borderRadius: 8,
        marginLeft: 60,
        marginRight: 70,
    },
    input: {
        width: 150,
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        color: '#000',
    },
    dummy: {
        width: 20,
        // height: 50,
        // borderColor: 'gray',
        // borderWidth: 1,
    },
    
});
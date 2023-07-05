import React, { useEffect } from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import logo from '../images/logo.png';
import BottomNavigation from './BottomNavigation';
const ContactButtons = ({ toggleWifiList,toggleHome,toggleAbout }) => {

    const handleBackButton = () => {
        toggleAbout();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Clean up the event listener when the component unmounts
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, []);

    const handleMailButtonPress = () => {
        Linking.openURL('mailto:technovate@gmail.com');
    };

    const handleWhatsAppButtonPress = () => {
        Linking.openURL('https://wa.me/1234567890'); // Replace with the actual WhatsApp number
    };

    const handleWebsiteButtonPress = () => {
        Linking.openURL('https://technovateinfotech.com/'); // Replace with the actual website URL
    };

    return (
        <>
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Contact Us
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleMailButtonPress}>
                    <Image source={require('../images/mail.png')} style={styles.buttonImage} />
                    <Text style={styles.buttonText}>Mail</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleWhatsAppButtonPress}>
                    <Image source={require('../images/whatsapp.png')} style={styles.buttonImage} />
                    <Text style={styles.buttonText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleWebsiteButtonPress}>
                    <Image source={require('../images/web.png')} style={styles.buttonImage} />
                    <Text style={styles.buttonText}>Website</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottom}>
                <BottomNavigation  toggleWifiList={toggleWifiList} toggleHome={toggleAbout} toggleAbout={toggleAbout} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: -350,
        marginLeft: 20,
        marginBottom: 50,
        width: '100%',

    },
    button: {
        flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: '#007EA7',
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonImage: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight:'normal',
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 0,
        marginTop: 0,
        backgroundColor: '#003249',
        height: 100,
        // paddingHorizontal: 200,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 350,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        marginLeft: 20,
        color: '#fff',
    },

});

export default ContactButtons;

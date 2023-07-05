import React, { useEffect } from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
const Contact = ({ toggleWifiList,toggleHome,toggleContact }) => {

    const handleBackButton = () => {
        toggleContact();
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
            <Header children={'Contact Us'} />
            <View style={styles.container}>
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
                <BottomNavigation  toggleWifiList={toggleWifiList} toggleHome={toggleContact} toggleContact={toggleContact} />
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
        backgroundColor: '#007EA7',
        zIndex: -1,

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
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight:'normal',
        margin: 10,
    },
});

export default Contact;

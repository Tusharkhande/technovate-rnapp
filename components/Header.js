import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import logo from '../images/logo.png';

const Header = () => {
    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginBottom: 100,
        backgroundColor: '#003249',
        height: 100,
        paddingHorizontal: 200,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 350,
    },
});

export default Header;
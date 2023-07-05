import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function BottomNavigation({  toggleWifiList,toggleHome,toggleAbout }) {
    return (
        <>
            {/* <View style={styles.bottomContainer}> */}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.touch} onPress={toggleWifiList} >
                        <Image style={styles.img} source={require('../images/list.png')} />
                        <Text style={styles.text}>Wifi List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={toggleHome}>
                    <Image style={styles.img} source={require('../images/home.png')} />
                        <Text style={styles.text}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={toggleAbout} >
                    <Image style={styles.img} source={require('../images/support.png')} />
                        <Text style={styles.text}>Contact</Text>
                    </TouchableOpacity>
                </View>
            {/* </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        margin: 0,
        
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#003249',
        justifyContent: 'space-evenly',
        height: 70,
    },
    text: {
        color: '#80CED7',
        fontSize: 16,
    },
    touch: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 30,
        height: 30,
    },
});


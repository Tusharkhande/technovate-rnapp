import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image, BackHandler } from 'react-native';
import logo from '../images/logo.png';

const AboutScreen = ({toggleAbout}) => {

  const handleBackButton = () => {
    toggleAbout();
    return true;
};

useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
}, []);

  return (
    <>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo} />
      </View>
      <View style={styles.container}>

        <Text style={styles.title}>About WiFi QR Code Scanner</Text>
        <Text style={styles.description}>
          Our WiFi QR Code Scanner app simplifies the process of connecting to WiFi networks. With a simple scan of QR codes, you can effortlessly connect to WiFi networks without the need to manually enter network details.
        </Text>
        <Text style={styles.subTitle}>Key Features:</Text>
        <Text style={styles.feature}>
          - QR Code Scanning: Our app allows you to quickly scan QR codes containing WiFi network information, including SSID and password.
        </Text>
        <Text style={styles.feature}>
          - Seamless Connection: Once a QR code is scanned, the app automatically retrieves the IP address and establishes a connection to the WiFi network.
        </Text>
        <Text style={styles.feature}>
          - Webpage Integration: The app seamlessly integrates with a WebView component, enabling you to load webpages using the retrieved IP address.
        </Text>
        <Text style={styles.feature}>
          - Location and WiFi Status: Our app checks the status of your device's location and WiFi services, providing you with valuable insights into your connectivity options.
        </Text>
        <Text style={styles.feature}>
          - Current WiFi Details: Get instant access to the current WiFi SSID, allowing you to identify the network you're connected to at a glance.
        </Text>
        <Text style={styles.feature}>
          - Intuitive User Interface: Our app features a user-friendly interface that makes scanning QR codes and managing WiFi connections a breeze.
        </Text>
        <Text style={styles.conclusion}>
          Whether you're connecting to a new WiFi network or sharing your network details with others, our WiFi QR Code Scanner app offers a convenient and efficient solution. Enjoy hassle-free WiFi connectivity with just a simple scan!
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feature: {
    fontSize: 16,
    marginBottom: 4,
  },
  conclusion: {
    fontSize: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#003249',
    // width: '100%',
    height: 100,  
    paddingHorizontal: 200,

  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 350,
},
});

export default AboutScreen;

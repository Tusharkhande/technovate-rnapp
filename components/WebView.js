import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, ActivityIndicator, BackHandler,Image } from 'react-native';
import Button from './Button';


export default function CustomWebView({ ipAddress, isLoading, handleLoadStart, handleLoadEnd, handleWebViewError, toggleWebView }) {
  const [canGoBack, setCanGoBack] = useState(false);
  const back2 = require('../images/back2.png');

  const handleBackPress = () => {
    toggleWebView();
    return true; // Return true to prevent the default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
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
        cacheEnabled={true}
        cacheMode="LOAD_DEFAULT"
        domStorageEnabled={true}
        scalesPageToFit={false}
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
          image={back2}
          onPress={() => {
            toggleWebView();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  buttons: {
    position: 'absolute',
    top: 10,
    right: 3,
    zIndex:1,
  },
});

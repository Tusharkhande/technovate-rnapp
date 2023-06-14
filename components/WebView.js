import React from 'react';
import { WebView } from 'react-native-webview';

export default function WebView() {
    return(
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
              title={'Go back'}
              image={back}
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
        marginTop: 5,
        backgroundColor: '#000',
        borderRadius: 20,
      },
});

feat: Add Wi-Fi connection functionality

Added functionality to connect to a Wi-Fi network using the `react-native-android-wifi` package. Firstly the wifi-qr-code is scanned and the wifi details are extracted from it. Then the `findAndConnect` function is called with the SSID and password extracted from qr. If the connection is successful, the default gateway IP address is retrieved using the `NetworkInfo` module and displayed in the console. The `setIpAddress` function is called to update the state with the default gateway IP address. Finally, a success message is displayed using an `Alert` component and the default login page of the wifi router is loaded in the webview.
git commit -m "Added functionality to connect to a Wi-Fi network using the `react-native-android-wifi` package. Firstly the wifi-qr-code is scanned and the wifi details are extracted from it. Then the `findAndConnect` function is called with the SSID and password extracted from qr. If the connection is successful, the default gateway IP address is retrieved using the `NetworkInfo` module and displayed in the console. The `setIpAddress` function is called to update the state with the default gateway IP address. Finally, a success message is displayed using an `Alert` component and the default login page of the wifi router is loaded in the webview."
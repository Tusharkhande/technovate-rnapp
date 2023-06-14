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
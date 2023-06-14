import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function QRCodeScanner() {
    return(
        <View style={styles.barcodebox}>
            <QRCodeScanner
              onRead={handleBarCodeScanned}
              flashMode={flash}></QRCodeScanner>
            <View style={styles.flashButtonContainer}>
              <Button
                onPress={toggleFlash}
                image={
                  flash === RNCamera.Constants.FlashMode.off
                    ? flashOn
                    : flashOff
                }
                style={styles.flashButton}
              />
            </View>
          </View>
    );
}

const styles = StyleSheet.create({
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato',
      },
      flashButtonContainer: {
        position: 'absolute',
        top: 3,
        left: 220,
        padding: 20,
        borderRadius: 20,
      },
      flashButton: {
        width: 24,
        height: 24,
      },
});
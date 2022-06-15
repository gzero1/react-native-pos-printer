import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  Alert,
  Button,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {
  createEscPosEncoder,
  createBluetoothManager,
  Peripheral,
  createRNPreviewEncoder,
  isJSXArray,
  VirtualPaper,
} from '@g01-tecnologia/react-native-pos-printer';

const Bluetooth = createBluetoothManager({ showAlert: false });

const App: React.FC = () => {
  const [selectedPrinter, setSelectedPrinter] = useState<Peripheral | null>(
    null
  );
  const [printers, setPrinters] = useState<Peripheral[]>([]);

  const [paperData, setPaperData] = useState<JSX.Element[]>([]);

  const [showPaper, setShowPaper] = useState<boolean>(false);

  const refreshPrinters = async () => {
    setPrinters(await Bluetooth.getPairedDevices());
  };

  const printImage = async () => {
    if (selectedPrinter === null) {
      Alert.alert('Impressora não conectada');
      return;
    }

    const imageUri = await (
      await RNFetchBlob.fetch(
        'GET',
        'https://i.imgur.com/kHCNQuX_d.jpeg?maxwidth=400'
      )
    ).base64();

    const encoder = createEscPosEncoder({
      imageMode: 'column',
    });

    const encoded = encoder
      .initialize()
      .codepage('cp437')
      .newline()
      .align('center')
      .line('Olá, POS')
      .image(`data:image/png;base64,${imageUri}`)
      .newline()
      .newline()
      .encode();

    Bluetooth.sendEscPosCommands(encoded);
  };

  /**
   *
   * ! Playground !
   *
   */
  const playground = async (mode: 'toScreen' | 'toPOS') => {
    if (mode === 'toScreen') setShowPaper(true);

    try {
      if (selectedPrinter === null) {
        Alert.alert('No printer connected');
        return;
      }

      const currentEncoder =
        mode === 'toScreen' ? createRNPreviewEncoder : createEscPosEncoder;
      const encoder = currentEncoder({
        imageMode: 'raster',
      });

      const results = encoder
        .initialize()
        .codepage('cp437')
        .newline()
        .align('center')
        .bold(true)
        .height(2)
        .width(2)
        .line('HELLO Pos!')
        .width(1)
        .height(1)
        .bold(false)
        .encode();

      if (isJSXArray(results)) {
        setPaperData(results);
      } else {
        Bluetooth.sendEscPosCommands(results);
      }
    } catch {
      setShowPaper(false);
    }
  };

  useEffect(() => {
    (async () => {
      refreshPrinters();
      console.log(await Bluetooth.isConnected());
      if (!(await Bluetooth.isConnected())) {
        setSelectedPrinter(null);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView scrollEnabled={true}>
        <View style={styles.scrollView}>
          <Button title="Refresh" onPress={refreshPrinters} />
          <Text>Bluetooth Devices:</Text>
          <View style={styles.printerList}>
            {printers.map((peripheral, index) => {
              const connected = peripheral.id === selectedPrinter?.id;
              return (
                <Pressable
                  key={peripheral.id + index}
                  onPress={async () => {
                    try {
                      if (connected) {
                        await Bluetooth.disconnect(peripheral.id);
                        setSelectedPrinter(null);
                      } else {
                        await Bluetooth.connect(peripheral.id);
                        setSelectedPrinter(peripheral);
                      }
                    } catch (e: any) {
                      Alert.alert("Couldn't connect to printer");
                    }
                  }}
                  style={
                    connected ? styles.connectedPrinter : styles.printerButton
                  }
                >
                  <Text>{peripheral.name}</Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable style={styles.printButton} onPress={printImage}>
            <Text style={styles.printButtonText}>Print Large Image</Text>
          </Pressable>
          <Pressable
            style={styles.printButton}
            onPress={() => playground('toPOS')}
          >
            <Text style={styles.printButtonText}>Playground to POS</Text>
          </Pressable>
          <Pressable
            style={styles.printButton}
            onPress={() => playground('toScreen')}
          >
            <Text style={styles.printButtonText}>Playground to Screen</Text>
          </Pressable>
          {showPaper && (
            <VirtualPaper paperColor="yellow">
              {!paperData.length ? (
                <View style={styles.loadingPaper}>
                  <ActivityIndicator size="large" color={'#000'} />
                </View>
              ) : (
                paperData
              )}
            </VirtualPaper>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { height: '100%', padding: 20 },
  scrollView: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    padding: 20,
  },
  printButton: {
    marginVertical: 20,
    width: 200,
    height: 100,
    backgroundColor: 'lightblue',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  printButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  printerButton: {
    backgroundColor: 'lightblue',
    borderRadius: 9999,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  printerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  connectedPrinter: {
    backgroundColor: 'lightgreen',
    borderRadius: 9999,
    padding: 8,
  },
  text: {
    fontSize: 42,
  },
  loadingPaper: {
    marginVertical: 20,
  },
});

export default App;

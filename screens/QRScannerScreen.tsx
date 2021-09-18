import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { RootTabScreenProps } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { saveQRData } from '../actions/application.actions';
import { Application, QRType } from '../types/Application';

const QRScannerScreen = ({ navigation }: RootTabScreenProps<'QRScannerScreen'>) => {
	const [hasPermission, setHasPermission] = useState(false);
	const QRList = useSelector<Application, QRType[]>((state) => state.QRList);
	const [scanned, setScanned] = useState(false);
	const dispatch = useDispatch();

	const askPermission = async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync();
		setHasPermission(status === 'granted');
	};
	useEffect(() => {
		askPermission();
	}, []);

	const handleBarCodeScanned = ({ type, data }: { type: any; data: string }) => {
		setScanned(true);
		let isInList = false;
		const scannedQR = { id: `${data}`, value: data };

		QRList.forEach((item) => {
			if (item.value == scannedQR.value) isInList = true;
		});

		if (isInList) {
			Alert.alert('Successful scan', 'You already scanned that QR!!', [{ text: 'OK' }]);
			return;
		}
		dispatch(saveQRData(scannedQR));
		Alert.alert('Successful scan', 'Barcode scanned!', [{ text: 'OK' }]);
	};

	if (hasPermission === null) {
		return (
			<View style={styles.container}>
				<Text>Requesting for camera permission</Text>
			</View>
		);
	}
	if (hasPermission === false) {
		return (
			<View style={styles.container}>
				<Text style={{ paddingHorizontal: 20, alignItems: 'center' }}>
					No access to camera. If you want to use this app you need to give us permission through
					your mobile configuration.
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
export default QRScannerScreen;

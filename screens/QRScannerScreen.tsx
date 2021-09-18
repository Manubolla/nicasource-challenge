import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
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

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }: { type: any; data: string }) => {
		setScanned(true);
		let isInList = false;
		const scannedQR = { id: `${data}`, value: data };

		QRList.forEach((item) => {
			if (item.value == scannedQR.value) isInList = true;
		});

		if (isInList) {
			alert('You already scanned that QR!!');
			return;
		}
		dispatch(saveQRData(scannedQR));
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
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
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
export default QRScannerScreen;

import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Dimensions, Button, View, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQRData } from '../actions/application.actions';
import Card from '../components/Card';
import { Application, QRType } from '../types/Application';

const QRListScreen = () => {
	const QRList = useSelector<Application, QRType[]>((state) => state.QRList);

	const textInputRef = useRef<TextInput>(null);
	const dispatch = useDispatch();
	const [deleteMode, setDeleteMode] = useState(false);
	const [data, setData] = useState(QRList);

	const handleDelete = () => {
		dispatch(deleteQRData());
		setDeleteMode(false);
	};
	const handleChange = (value: string) => {
		if (data) {
			if (!value) {
				setData(QRList);
				return;
			}
			const filteredList = [...QRList].filter((item) =>
				item.value.toLowerCase().includes(value.toLocaleLowerCase())
			);
			setData(filteredList);
			if (filteredList.length == 0) {
				if (textInputRef && textInputRef.current) textInputRef.current.blur();
			}
		}
		return;
	};
	useEffect(() => {
		setData(QRList);
	}, [QRList]);
	return (
		<SafeAreaView style={styles.container}>
			<TextInput ref={textInputRef} onChangeText={handleChange} style={styles.input} />
			<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
				<Button title={'Delete items'} disabled={!deleteMode} onPress={handleDelete} />
				<Button
					title={deleteMode ? 'Cancel select' : 'Select'}
					onPress={() => setDeleteMode((prevState) => !prevState)}
					disabled={QRList.length == 0}
				/>
			</View>
			{data.length > 0 && (
				<FlatList
					data={data}
					keyExtractor={(item) => `${item.value.length + Math.random()}`}
					renderItem={({ item }) => {
						return <Card data={item} deleteMode={deleteMode} />;
					}}
				/>
			)}
			{data.length == 0 && (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<Text>No results</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		width: Dimensions.get('screen').width,
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
	cardContainer: {
		padding: 10,
		margin: 10,
		shadowOffset: { width: 0, height: 2 },
		shadowColor: '#000',
		shadowRadius: 8,
		shadowOpacity: 0.3,
		elevation: 8,
		borderRadius: 8,
		minHeight: 50,
		justifyContent: 'center',
	},
	qrText: {},
	chevron: {
		width: 30,
		height: 30,
	},
	trash: {
		width: 30,
		height: 30,
	},
	chevronContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
export default QRListScreen;

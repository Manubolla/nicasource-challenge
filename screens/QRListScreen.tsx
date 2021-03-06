import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Dimensions, Button, View, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDeleteList, deleteQRData } from '../actions/application.actions';
import Card from '../components/Card';
import { Application, QRType } from '../types/Application';

const QRListScreen = () => {
	const QRList = useSelector<Application, QRType[]>((state) => state.QRList);

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
		}
		return;
	};
	const handleDeleteMode = () => {
		dispatch(cleanDeleteList());
		setDeleteMode((prevState) => !prevState);
	};
	useEffect(() => {
		setData(QRList);
	}, [QRList]);
	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				placeholder={QRList.length == 0 ? 'No list to filter' : 'Filter list'}
				onChangeText={handleChange}
				style={[
					styles.input,
					QRList.length == 0 && { backgroundColor: '#F3F1F5', borderColor: '#C9CCD5' },
				]}
				editable={QRList.length !== 0}
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
				<Button title={'Delete items'} disabled={!deleteMode} onPress={handleDelete} />
				<Button
					title={deleteMode ? 'Cancel select' : 'Select'}
					onPress={handleDeleteMode}
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
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
export default QRListScreen;

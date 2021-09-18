import React from 'react';
import { useCallback, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addSelectedItem, removeSelectedItem } from '../actions/application.actions';
import { QRType } from '../types/Application';
const ChevronDown = require('../assets/images/chevron-down.png');
const ChevronUp = require('../assets/images/chevron-up.png');
const BlankBox = require('../assets/images/checkbox-blank-circle-outline.png');
const CheckedBox = require('../assets/images/checkbox-marked-circle-outline.png');

interface Props extends React.ComponentProps<typeof View> {
	data: QRType;
	deleteMode: boolean;
}

const Card = (props: Props) => {
	const { data, deleteMode, ...rest } = props;
	const dispatch = useDispatch();
	const NUM_OF_LINES = 2;
	const [showMore, setShowMore] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	const handleSelect = () => {
		if (isSelected) dispatch(removeSelectedItem(data));
		else dispatch(addSelectedItem(data));

		setIsSelected((prevState) => !prevState);
	};
	const onTextLayout = useCallback((e) => {
		setShowMore(e.nativeEvent.lines.length >= NUM_OF_LINES);
	}, []);

	return (
		<View
			{...rest}
			style={[styles.cardContainer, isSelected && { backgroundColor: '#FFB740', opacity: 0.6 }]}>
			{deleteMode && (
				<TouchableOpacity onPress={handleSelect} style={{width: "10%"}}>
					<Image source={isSelected ? CheckedBox : BlankBox} style={styles.trash} />
				</TouchableOpacity>
			)}
			<Text
				numberOfLines={isOpen ? 0 : NUM_OF_LINES}
				onTextLayout={onTextLayout}
				style={[styles.qrText, deleteMode && { width: '70%' }]}>
				{data.value}
			</Text>
			{showMore && (
				<TouchableOpacity
					onPress={() => setIsOpen((prevState) => !prevState)}
					style={styles.chevronContainer}>
					<Image style={styles.chevron} source={isOpen ? ChevronUp : ChevronDown} />
				</TouchableOpacity>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	cardContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		margin: 10,
		shadowOffset: { width: 0, height: 2 },
		shadowColor: '#000',
		shadowRadius: 8,
		shadowOpacity: 0.3,
		elevation: 8,
		borderRadius: 8,
		minHeight: 50,
		backgroundColor: '#fff',
		position: "relative"
	},
	qrText: {
		marginLeft: 10,
		width: "80%"
	},
	chevron: {
		width: 30,
		height: 30,
	},
	trash: {
		width: 20,
		height: 20,
	},
	chevronContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: "20%"
	},
});
export default Card;

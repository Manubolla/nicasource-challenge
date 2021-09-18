import React, { useState } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity, Easing } from 'react-native';

const Shake = (props: { children: React.ReactNode }) => {
	const { children } = props;

	const [animation] = useState(new Animated.Value(0));
	const [isShaking, setIsShaking] = useState(false);
	const startAnimation = () => {
		animation.setValue(0);
		Animated.loop(
			Animated.sequence([
				Animated.timing(animation, {
					toValue: 1.0,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
				Animated.timing(animation, {
					toValue: 0.0,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
			])
		).start(() => {});
		if (isShaking) {
			setIsShaking((prevState) => !prevState);
			return animation.setValue(0);
		}
		setIsShaking((prevState) => !prevState);
	};

	const animatedStyles = {
		transform: [
			{
				translateX: animation.interpolate({
					inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
					outputRange: [0, 10, -10, 10, -10, 0, 0, 0, 0, 0, 0],
				}),
			},
		],
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onLongPress={startAnimation}>
				<Animated.View style={[styles.box, animatedStyles]}>{children}</Animated.View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 600,
		alignItems: 'center',
		justifyContent: 'center',
	},
	box: {
		backgroundColor: 'tomato',
		width: 150,
		height: 150,
	},
});

export default Shake;

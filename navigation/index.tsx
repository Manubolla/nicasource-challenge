import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import QrScannerScreen from '../screens/QRScannerScreen';
import QRListScreen from '../screens/QRListScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<RootNavigator />
		</NavigationContainer>
	);
}
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
			<Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name='Modal' component={ModalScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName='QRScannerScreen'
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}>
			<BottomTab.Screen
				name='QRScannerScreen'
				component={QrScannerScreen}
				options={({ navigation }: RootTabScreenProps<'QRScannerScreen'>) => ({
					title: 'Scan',
					tabBarIcon: ({ color }) => <TabBarIcon name='qrcode' color={color} />,
				})}
			/>
			<BottomTab.Screen
				name='QRListScreen'
				component={QRListScreen}
				options={{
					title: 'QR List',
					tabBarIcon: ({ color }) => <TabBarIcon name='list' color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

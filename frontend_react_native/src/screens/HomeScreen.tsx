import React, { useContext, useState, useEffect, useRef } from 'react'
import { ImageBackground, StyleSheet, Text, View, Platform, Button, Alert } from 'react-native';

import * as Clipboard from 'expo-clipboard';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


import messaging from '@react-native-firebase/messaging';


const HomeScreen = () => {

	const [tokenPush, setTokenPush] = useState<any>('')

	const [contCurrentNotifications, setContCurrentNotifications] = useState(0)





	useEffect(() => {
	
		handleRegisterTokenApi();
	}, []);



/*
	async function requestUserPermission() {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log('Authorization status:', authStatus);

		}

		return enabled;
	}


	const logica = async () => {
		const permiso = await requestUserPermission();
		if (permiso) {
			messaging().getToken().then(token => {
				console.log("token for firebase ", token)
			})


			messaging().onNotificationOpenedApp(remoteMessage => {
				console.log(
					'Notification caused app to open from background state:',
					remoteMessage.notification,
				);
				//navigation.navigate(remoteMessage.data.type);
			});

			// Check whether an initial notification is available
			messaging()
				.getInitialNotification()
				.then(remoteMessage => {
					if (remoteMessage) {
						console.log(
							'Notification caused app to open from quit state:',
							remoteMessage.notification,
						);
						//setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
					}
					//setLoading(false);
				});
		}

	}
	useEffect(() => {
		logica();
	}, []);*/


	/*useEffect(() => {
		messaging().setBackgroundMessageHandler(async remoteMessage => {
			setContCurrentNotifications(contCurrentNotifications+1)
			console.log('Message handled in the background!', remoteMessage);
		});

		const unsubscribe = messaging().onMessage(async remoteMessage => {
			var contador =contCurrentNotifications+2;
			setContCurrentNotifications(contador)
			Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
		});

		return unsubscribe;
	}, []);*/


	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(tokenPush);
	};


	//configuration push Notifications
	async function registerForPushNotificationsAsync() {
		let token: any;

		try {
			if (Platform.OS === 'android') {
				await Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: '#FF231F7C',
				});
			}

			if (Device.isDevice) {

				const { status: existingStatus } = await Notifications.getPermissionsAsync();
				let finalStatus = existingStatus;
				//alert(`existingStatus ${existingStatus}`)
				if (existingStatus !== 'granted') {
					const { status } = await Notifications.requestPermissionsAsync();
					finalStatus = status;
				}
				if (finalStatus !== 'granted') {
					alert('Failed to get push token for push notification!');
					return;
				}
				/*	token = (await Notifications.getExpoPushTokenAsync(
					)).data;*/
				token = (await Notifications.getDevicePushTokenAsync()).data;
				alert(token)
				console.log("token Device: ", token)
				return token

			} else {
				alert('Must use physical device for Push Notifications');
			}

		} catch (error) {
			console.log(error)
			alert(error)
		}

		//return token;
	}

	const handleRegisterTokenApi = async () => {

		const tokenPushNotification = await registerForPushNotificationsAsync()
		console.log("token psuh", tokenPushNotification)
		if (tokenPushNotification) {
			setTokenPush(tokenPushNotification)
		
		} 
	}

	return (
		<View style={homeStyles.formContainer}>
			<Button title="COPIAR TOKEN" onPress={copyToClipboard} />
			<Text>Mi token push es : {tokenPush}</Text>
			<View style={homeStyles.welcomeContainer}>
				<Text style={homeStyles.welcomeFirtsText}>!</Text>
				<Text style={homeStyles.welcomeSecondText}>Notificaciones Expo FCM</Text>
			</View>


			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

				<View style={homeStyles.optionContainer}>
					<View>

						<ImageBackground
							style={homeStyles.image}
							resizeMode='cover'
							source={require('../assets/Menu/noti.png')}
						>
						</ImageBackground>
						<Text style={{
							color: 'white', textAlign: 'center', position: 'absolute',
							backgroundColor: 'red', borderRadius: 30, fontSize: 16, fontWeight: 'bold',
							padding: 10, width: 40,
							top: 1, right: 10
						}}>{contCurrentNotifications}</Text>
					</View>

				</View>
			</View>









		</View>
	)
}

export default HomeScreen;

const homeStyles = StyleSheet.create({
	formContainer: {
		flex: 1,
		//height: '100%',
		justifyContent: 'center'
	},
	welcomeContainer: {
		justifyContent: 'center',
		marginTop: '5%',
		marginBottom: '10%'
	},
	welcomeFirtsText: {
		color: '#434A50',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 25
	},
	welcomeSecondText: {
		textAlign: 'center',
		color: '#434A50',
		fontSize: 15
	},
	optionContainer: {
		//position: 'relative',

		//display:'flex',
		//flexDirection:'row',
		//alignItems:'center',
		//justifyContent: 'center',

		//paddingHorizontal: '5%',

		marginTop: '10%',
		marginBottom: '10%',

	},
	image: {

		height: 200,
		width: 200,
		//backgroundColor: '#09090987',
		//backgroundColor: 'black',
		//opacity: 0.5,


	},
	textContainer: {
		position: 'absolute',
		//  backgroundColor: "#09090987",
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginLeft: '10%',
		// height: '100%',
		//top:20,
		//bottom:70,
		width: '100%'
	},
	text: {
		//backgroundColor:'red',

		color: "black",
		fontSize: 20,
		fontWeight: "bold",
		//textAlign: "left",


	}
});

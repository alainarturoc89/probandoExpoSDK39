import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';
import { firebase } from "./useFirebase";

async function sendPushNotification(data: any) {
    let tokens = new Array;
    await firebase.database().ref('/users/').once('value').then((snapshot) => {
        tokens = Object.values(snapshot.val()).map((user: any) => { return user.token });
    });
    let to = [];
    for (let token of tokens) {
        if (token === "") { continue; }
        to.push(token)
    }
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to,
            title: data.title,
            body: data.body,
            android: { channelId: 'lisbet' }
        }),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Falla al obtener el token');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Usa un celular para las notificaciones');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('lisbet', {
            name: 'lisbet',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
        });
    }

    return token;
}

export { registerForPushNotificationsAsync, sendPushNotification }
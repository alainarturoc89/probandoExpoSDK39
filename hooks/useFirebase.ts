import * as firebase from 'firebase';

const firebaseConfig = {

    apiKey: 'AIzaSyAhnlp7RcK6YAVH35puEuL7BpCYZTe4IWw',

    authDomain: 'lisbet-b7ed9.firebaseapp.com',

    databaseURL: 'https://lisbet-b7ed9-default-rtdb.firebaseio.com',

    projectId: 'lisbet-b7ed9',

    storageBucket: 'lisbet-b7ed9.appspot.com',

    messagingSenderId: '853129856245',

    appId: '1:853129856245:android:88d80ddbd2552b647931bc'

}

firebase.initializeApp(firebaseConfig);

export { firebase }
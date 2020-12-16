import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import * as firebase from 'firebase';

export default function useCachedResources() {

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {

    async function loadResourcesAndDataAsync() {

      try {

        SplashScreen.preventAutoHideAsync();

        //Fuente
        await Font.loadAsync({

          ...Ionicons.font,

          'courgette': require('../assets/fonts/Courgette-Regular.ttf'),

          'notoSerif': require('../assets/fonts/Noto_Serif/NotoSerif-Regular.ttf'),

          'notoSerif-bold': require('../assets/fonts/Noto_Serif/NotoSerif-Bold.ttf'),

          'notoSerif-bold-italic': require('../assets/fonts/Noto_Serif/NotoSerif-BoldItalic.ttf'),

          'notoSerif-italic': require('../assets/fonts/Noto_Serif/NotoSerif-Italic.ttf'),

        });

        if (!global.firebase) {

          firebase.initializeApp({

            apiKey: 'AIzaSyAvCVeh6YBJar7VuhRhazArN5T0qLzCzvY',

            authDomain: 'lisbet-b7ed9.firebaseapp.com',

            databaseURL: 'https://lisbet-b7ed9-default-rtdb.firebaseio.com',

            projectId: 'lisbet-b7ed9',

            storageBucket: 'lisbet-b7ed9.appspot.com',

            messagingSenderId: '853129856245',

            appId: '1:853129856245:android:88d80ddbd2552b647931bc'

          });

          global.firebase = firebase;

        }

      }
      catch (e) { console.warn(e); }

      finally {

        setLoadingComplete(true);

        SplashScreen.hideAsync();

      }

    }

    loadResourcesAndDataAsync();

  }, []);

  return isLoadingComplete;
  
}

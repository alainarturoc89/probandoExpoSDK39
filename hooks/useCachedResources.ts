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
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        //Configuracion de firebase        
        firebase.initializeApp({
          apiKey: 'AIzaSyAGtjEe3SZyNbLqVTS9FOGHCfOc8sQkAPY',
          authDomain: 'probandoexposdk39.firebaseapp.com',
          databaseURL: 'https://probandoexposdk39.firebaseio.com',
          projectId: 'probandoexposdk39',
          storageBucket: 'probandoexposdk39.appspot.com',
          messagingSenderId: '535636779172',
          appId: '1:535636779172:android:e87a9144a7a547e53f4631'
        });
        global.firebase = firebase;

      }
      catch (e) {
        console.warn(e);
      }
      finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

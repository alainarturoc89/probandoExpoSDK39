import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import i18n from '../languages';
import * as FileSystem from 'expo-file-system';
import * as firebase from 'firebase';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        (global as any).language = i18n;

        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        let { exists } = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "/config.json");
        if (exists) {
          FileSystem.readAsStringAsync(FileSystem.documentDirectory + "/config.json")
            .then(conf => {
              let config = JSON.parse(conf);
              (global as any).config = config;
            })
        } else {
          let config = {
            user: { user: "123", password: "123" },
            isLoggedIn: true
          };
          await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "/config.json", JSON.stringify(config))
            .then(() => {
              (global as any).confif = config;
            })
        }

        const firebaseConfig = {
          apiKey: 'AIzaSyAGtjEe3SZyNbLqVTS9FOGHCfOc8sQkAPY',
          authDomain: 'probandoexposdk39.firebaseapp.com',
          databaseURL: 'https://probandoexposdk39.firebaseio.com',
          projectId: 'probandoexposdk39',
          storageBucket: 'probandoexposdk39.appspot.com',
          messagingSenderId: '535636779172',
          appId: '1:535636779172:android:e87a9144a7a547e53f4631',
          measurementId: 'G-measurement-id',
        };
        firebase.initializeApp(firebaseConfig);
        (global as any).firebase = firebase;
        (global as any).changeConfig = async (config: any) => {
          await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "/config.json", JSON.stringify(config))
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

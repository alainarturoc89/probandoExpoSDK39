import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStack, globalThis } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import CommonNavigator from './CommonNavigator';
import OutsideNavigator from './OutsideNavigator';
import InsideNavigator from './InsideNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
    //  linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStack>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/*((global as any).isLoggedIn)
        ? <Stack.Screen name="Inside" component={InsideNavigator} />
        : <Stack.Screen name="Outside" component={OutsideNavigator} />
      */}
      <Stack.Screen name="Outside" component={OutsideNavigator} />
      <Stack.Screen name="Inside" component={InsideNavigator} />
      <Stack.Screen name="Common" component={CommonNavigator} />
    </Stack.Navigator>
  );
}
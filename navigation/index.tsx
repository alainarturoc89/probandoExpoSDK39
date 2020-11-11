import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { RootStack } from '../types';

import CommonNavigator from './CommonNavigator';
import OutsideNavigator from './OutsideNavigator';
import InsideNavigator from './InsideNavigator';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStack>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={(global as any).config.isLoggedIn ? "Inside" : "Outside"}>
      <Stack.Screen name="Outside" component={OutsideNavigator} />
      <Stack.Screen name="Inside" component={InsideNavigator} />
      <Stack.Screen name="Common" component={CommonNavigator} />
    </Stack.Navigator>
  );
}
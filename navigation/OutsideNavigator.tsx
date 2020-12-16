import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Ionicons, View } from "../components/Elements";
import InitScreen from '../modules/outside/init/InitScreen';
import { OutsideStack } from '../types';

export default function InitNavigator() {

  const OutsideStack = createStackNavigator<OutsideStack>();

  return (
    <OutsideStack.Navigator initialRouteName="Init">

      <OutsideStack.Screen
        name="Init"
        component={InitScreen}
        options={{
          headerLeft: () => <View style={{ marginHorizontal: 10, flexDirection: "row" }}>

            <View style={{ marginRight: 10 }}><Ionicons name="ios-flower" size={32} color="#fff" /></View>

            <View style={{ marginRight: 10 }}><Ionicons name="ios-heart-empty" size={32} color="#fff" /></View>

          </View>,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#c96eb7" },
          headerTintColor: "#fff",
          headerTitle: () => null,
          headerRight: () => <View style={{ marginHorizontal: 10, flexDirection: "row" }}>

            <View style={{ marginRight: 10 }}><Ionicons name="ios-heart-empty" size={32} color="#fff" /></View>

            <View style={{ marginRight: 10 }}><Ionicons name="ios-flower" size={32} color="#fff" /></View>

          </View>
        }}

      />

    </OutsideStack.Navigator>

  );
}
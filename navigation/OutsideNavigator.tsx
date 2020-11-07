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
            <View style={{ marginRight: 10 }}><Ionicons name="ios-heart-empty" size={32} color="#C3F6F5" /></View>
            <View style={{ marginRight: 10 }}><Ionicons name="md-flower" size={32} color="#C3F6F5" /></View>
          </View>,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#FF3393" },
          headerTintColor: "#fff",
          title:"",
          headerRight: () => <View style={{ marginHorizontal: 10, flexDirection: "row" }}>
            <View style={{ marginRight: 10 }}><Ionicons name="md-flower" size={32} color="#C3F6F5" /></View>
            <View style={{ marginRight: 10 }}><Ionicons name="ios-heart-empty" size={32} color="#C3F6F5" /></View>
          </View>
        }}
      />
    </OutsideStack.Navigator>
  );
}
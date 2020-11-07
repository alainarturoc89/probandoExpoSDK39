import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Ionicons, View, Text } from "../components/Elements";
import HelpScreen from '../modules/common/help/HelpScreen';

import { CommonStack } from '../types';

export default function InitNavigator({ ...props }) {

    const CommonStack = createStackNavigator<CommonStack>();
    return (
        <CommonStack.Navigator>
            <CommonStack.Screen name="Help" component={HelpScreen}
                options={{
                    headerLeft: () => <View style={{ marginHorizontal: 10, }}><Ionicons name="md-arrow-round-back" size={32} color="#C3F6F5" onPress={() => props.navigation.goBack()} /></View>,
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "#FF3393" },
                    headerTintColor: "#fff",
                    headerTitle: () => <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <View style={{ marginRight: 10 }}><Ionicons name="md-flower" size={32} color="#C3F6F5" /></View>
                        <View style={{ marginRight: 10 }}><Ionicons name="ios-heart-empty" size={32} color="#C3F6F5" /></View>
                        <Text style={{ paddingHorizontal: 10, marginRight: 5, color: "#C3F6F5", fontSize: 20, fontWeight: "bold" }}>Ayuda</Text>
                        <View style={{ marginRight: 10 }}><Ionicons name="ios-heart-empty" size={32} color="#C3F6F5" /></View>
                        <View style={{ marginRight: 10 }}><Ionicons name="md-flower" size={32} color="#C3F6F5" /></View>
                    </View>
                }}
            />
        </CommonStack.Navigator>
    );
}
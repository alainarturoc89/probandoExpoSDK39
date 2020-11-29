import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Ionicons, View, TouchableOpacity } from "../components/Elements";
import PublicacionesScreen from '../modules/inside/PublicacionesScreen';
import DescargasScreen from '../modules/inside/DescargasScreen';
import { InsideStack } from '../types';
import InitScreen from '../modules/outside/init/InitScreen';

function InsideTab() {
    const InsideTab = createBottomTabNavigator();
    return (
        <InsideTab.Navigator tabBarOptions={{
            activeBackgroundColor: "#9F4ADE",
            activeTintColor: "#fff",
            inactiveTintColor: "#9F4ADE",
            style: { backgroundColor: "#fff" },
            tabStyle: { justifyContent: "center" },
            labelStyle: { fontSize: 15, fontWeight: "bold" }
        }}>
            <InsideTab.Screen name="Publicaciones" component={PublicacionesScreen} />
            <InsideTab.Screen name="Descargas" component={DescargasScreen} />
            <InsideTab.Screen name="Cerrar"
                listeners={({ navigation, route }) => ({
                    tabPress: e => { e.preventDefault(); navigation.navigate('Outside'); },
                })} >
                {() => null}
            </InsideTab.Screen>
        </InsideTab.Navigator>
    );
}

export default function InitNavigator({ ...props }) {
    const InsideStack = createStackNavigator<InsideStack>();
    return (
        <InsideStack.Navigator screenOptions={{
            headerLeft: () => null,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#9F4ADE" },
            headerTintColor: "#fff",
            headerTitle: () => <View style={{ alignItems: "center", flexDirection: "row" }}>
                <View style={{ marginRight: 10 }}><Ionicons name="ios-flower" size={32} color="#fff" /></View>
                <View style={{ marginRight: 10 }}><Ionicons name="ios-heart-empty" size={32} color="#fff" /></View>
                <View style={{ marginRight: 10 }}><Ionicons name="ios-flower" size={32} color="#fff" /></View>
                <View style={{ marginRight: 10 }}><Ionicons name="ios-heart-empty" size={32} color="#fff" /></View>
                <View style={{ marginRight: 10 }}><Ionicons name="ios-flower" size={32} color="#fff" /></View>
                <View style={{ marginRight: 10 }}><Ionicons name="ios-heart-empty" size={32} color="#fff" /></View>
                <View style={{ marginRight: 10 }}><Ionicons name="ios-flower" size={32} color="#fff" /></View>
            </View>,
            headerRight: () => <TouchableOpacity style={{ flexDirection: "row-reverse", marginHorizontal: 10 }} onPress={() => props.navigation.navigate("Common", { screen: 'Help', })}>
                <Ionicons name="ios-help-circle" size={32} color="#fff" />
            </TouchableOpacity>
        }}>
            <InsideStack.Screen
                name="PublicacionesScreen"
                component={InsideTab}
            />
        </InsideStack.Navigator>
    );
}
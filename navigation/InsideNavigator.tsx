import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Ionicons, View, TouchableOpacity } from "../components/Elements";
import PublicacionesScreen from '../modules/inside/PublicacionesScreen';
import HelpScreen from '../modules/common/help/HelpScreen';
import { InsideStack } from '../types';

function InsideTab() {
    const InsideTab = createBottomTabNavigator();
    return (
        <InsideTab.Navigator tabBarOptions={{
            activeBackgroundColor: "#9F4ADE",
            activeTintColor: "#fff",
            inactiveTintColor: "#CD0D0D",
            style: { backgroundColor: "#fff" },
            tabStyle: { justifyContent: "center" },
            labelStyle: { fontSize: 15, fontWeight: "bold" }
        }}>
            <InsideTab.Screen name="Publicaciones" component={PublicacionesScreen} />
            <InsideTab.Screen name="Ayuda" component={HelpScreen} />
            <InsideTab.Screen name="Cerrar"
                listeners={({ navigation, route }) => ({
                    tabPress: e => { e.preventDefault(); 
                    global.firebase.auth().signOut().then(function() {
                        navigation.navigate('Outside');
                      }).catch(function(error) {
                      });
                },
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
            </View>
        }}>
            <InsideStack.Screen
                name="PublicacionesScreen"
                component={InsideTab}
            />
        </InsideStack.Navigator>
    );
}
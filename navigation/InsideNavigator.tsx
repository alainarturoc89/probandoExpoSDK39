import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Ionicons, View, TouchableOpacity } from "../components/Elements";
import PublicacionesScreen from '../modules/inside/PublicacionesScreen';
import HelpScreen from '../modules/common/help/HelpScreen';
import { InsideStack } from '../types';
import { firebase } from "../hooks/useFirebase";

function InsideTab() {

    const InsideTab = createBottomTabNavigator();

    return (
        <InsideTab.Navigator tabBarOptions={{
            activeBackgroundColor: "#c96eb7",
            activeTintColor: "#fff",
            inactiveTintColor: "#c96eb7",
            style: { backgroundColor: "#fff" },
            tabStyle: { justifyContent: "center" },
            labelStyle: { fontSize: 15, fontFamily: 'notoSerif-bold-italic', }
        }}>


            <InsideTab.Screen name="Publicaciones" component={PublicacionesScreen} />

            <InsideTab.Screen name="Ayuda" component={HelpScreen} />

        </InsideTab.Navigator>
    );
}

export default function InitNavigator({ ...props }) {

    const InsideStack = createStackNavigator<InsideStack>();

    return (
        <InsideStack.Navigator screenOptions={{
            headerLeft: () => null,
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#c96eb7" },
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
            headerRight: () => <TouchableOpacity style={{ alignItems: "center", marginRight: 10 }} onPress={async () => {

                await firebase.auth().signOut().then(function () {

                    props.navigation.navigate('Outside');
                    
                })
                    .catch(function (error) {
                    });

            }}>

                <Ionicons name="ios-power" size={40} color="#fff" />

            </TouchableOpacity>

        }}>

            <InsideStack.Screen name="PublicacionesScreen" component={InsideTab} />

        </InsideStack.Navigator>

    );
}
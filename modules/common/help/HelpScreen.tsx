import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CommonStack } from '../../../types';

export default function NotFoundScreen({
    navigation,
}: StackScreenProps<CommonStack, 'Help'>) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Help</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
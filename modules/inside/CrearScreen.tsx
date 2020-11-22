import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, } from '../../components/Elements';

export default function CrearScreen({ ...props }) {

    return (
        <View style={styles.container}>
            <Text>Crear</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff', padding: 20
    },
});
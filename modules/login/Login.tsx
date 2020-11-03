import * as React from 'react';
import { StyleSheet } from 'react-native';

import {
    Text,
    TextInput,
    View,
    Button
} from '../../components/Elements';

export default function LoginModule({ ...props }) {
console.log(globalThis);
    const [value, onChangeText] = React.useState('Useless Placeholder');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>OK</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <Button title="Entrar" onPress={() => props.navigation.navigate("Root")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});
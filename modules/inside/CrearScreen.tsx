import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';

import { TextInput, View, TouchableOpacity, Text } from '../../components/Elements';

export default function CrearScreen({ ...props }) {
    const [title, onChangeTitle] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    function crear() {
        if (title !== "" && description !== "") {
            props.crear({ title, description });
        } else {
            Alert.alert(
                "Importante",
                "Existen datos sin especificar",
                [{ text: "Cerrar" }],
                { cancelable: true }
              );
        }
    }
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Titulo de la publicacion *"
                multiline
                style={[styles.input]}
                onChangeText={text => onChangeTitle(text)}
                value={title} />
            <TextInput
                placeholder="Descripcion de la publicacion *"
                multiline
                style={[styles.input, { height: 100 }]}
                onChangeText={text => onChangeDescription(text)}
                value={description} />

            <TouchableOpacity
                style={[{ padding: 10, backgroundColor: "#9F4ADE", marginTop: 5, borderRadius: 5, marginHorizontal: 125 }]}
                onPress={() => crear()}>
                <Text style={[{ textAlign: "center", color: "#fff", fontSize: 17, fontWeight: "bold" }]}>Publicar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: {
        height: 50,
        borderRadius: 3,
        borderColor: 'gray',
        borderWidth: 0.5,
        marginBottom: 15,
        paddingHorizontal: 5
    }
});
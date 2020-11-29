import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { TextInput, View, TouchableOpacity, Text, FlatList, Image } from '../../components/Elements';

export default function CrearScreen({ ...props }) {
    const [title, onChangeTitle] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    const [contents, onChangeContents] = React.useState([]);
    function crear() {
        if (title !== "" && description !== "") {
            console.log(contents);
            //  props.crear({ title, description });
        } else {
            Alert.alert(
                "Importante",
                "Existen datos sin especificar",
                [{ text: "Cerrar" }],
                { cancelable: true }
            );
        }
    }

    async function loadFile() {
        let result = await DocumentPicker.getDocumentAsync({
            // type:"application/pdf; image/png; image/jpeg; image/jpg; audio/mpeg; audio/ogg; video/mp4",
            copyToCacheDirectory: true,
        });
        if (result.type === "success") {
            if ((result.size / 1e+6) <= 75) {
                console.log(result);
                onChangeContents(contents => [...contents, {
                    name: result["name"], uri: result["uri"], format: result["name"].split(".")[1]
                }]);
            }
            else
                Alert.alert(
                    "Importante",
                    "El fichero debe ser menor a 75 megas", [{ text: "Cerrar" }], { cancelable: true }
                );
        } else {
            Alert.alert(
                "Error",
                "Intenta nuevamente", [{ text: "Cerrar" }], { cancelable: true }
            );
        }
    }

    function typeDocument(type: any) {
        const image = ["png", "jpg", "jpeg"];
        const sound = ["mpeg", "mp3", "ogg"];
        const video = ["mp4", "avi"];
        if (image.includes(type))
            return { type: "image/" + type, image: true };
        else if (sound.includes(type))
            return { type: "audio/" + type, sound: true };
        else if (video.includes(type))
            return { type: "video/" + type, video: true };
        else return null;
    }
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Titulo de la publicación *"
                multiline
                style={[styles.input]}
                onChangeText={text => onChangeTitle(text)}
                value={title} />
            <TextInput
                placeholder="Descripcion de la publicación *"
                multiline
                style={[styles.input, { height: 100 }]}
                onChangeText={text => onChangeDescription(text)}
                value={description} />

            <TouchableOpacity
                style={[{ padding: 10, backgroundColor: "#9F4ADE", marginTop: 5, borderRadius: 5, marginHorizontal: 5 }]}
                onPress={loadFile}>
                <Text style={[{ textAlign: "center", color: "#fff", fontSize: 17, fontWeight: "bold" }]}>Adjuntar contenido</Text>
            </TouchableOpacity>
            <FlatList
                data={contents}
                keyExtractor={(item: object, index: number) => index.toString()}
                numColumns={2}
                renderItem={({ item, index, separators }) => {
                    return item.format === "png"
                        ? <Image source={{ uri: item.uri }} style={{ margin: 15, width: 150, height: 150 }}></Image>
                        : item.format === "png"
                            ? <Image source={{ uri: require("../../assets/images/1.png") }} style={{ margin: 15, width: 80 }}></Image>
                            : <Image source={{ uri: require("../../assets/images/1.png") }} style={{ margin: 15, width: 80 }}></Image>
                }
                } />

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
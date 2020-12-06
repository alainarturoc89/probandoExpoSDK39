import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { TextInput, View, TouchableOpacity, Text, FlatList, Image, Ionicons } from '../../components/Elements';

export default function CrearScreen({ ...props }) {

    const [title, onChangeTitle] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    const [medias, onChangeMedias] = React.useState([]);

    function crear() {
        if (title !== "" && description !== "") {
            props.crear({ title, description, medias });
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
            type: "image/*",
            copyToCacheDirectory: true
        });
        if (result.type === "success") {
            if ((result.size / 1e+6) <= 75) {
                let media = {
                    name: result["name"],
                    uri: result["uri"],
                    format: typeDocument(result["name"].split(".")[1]),
                    base64: "data:[" + typeDocument(result["name"].split(".")[1]) + "][;base64],"
                };
                onChangeMedias(medias => [...medias, media]);
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

    function delFile(file: any) {
        onChangeMedias(medias.filter(item => item !== file.item));
    }

    function reproduce(item: any) {
        return "";
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
                style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}
                onPress={loadFile}>
                <Text style={[{ marginRight: 5, color: "#9F4ADE", fontSize: 17, fontWeight: "bold" }]}>Adjuntar imagen</Text>
                <Ionicons name="md-attach" size={35} color="#9F4ADE" />
            </TouchableOpacity>

            <FlatList
                data={medias}
                keyExtractor={(item: object, index: number) => index.toString()}
                numColumns={2}
                renderItem={({ item, index, separators }) => {
                    return item.format.image
                        ? <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => reproduce({ item, type: "image" })}>
                                <Image source={{ uri: item.uri }} style={{ margin: 15, width: 150, height: 150 }}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: -30, marginTop: 5 }} onPress={() => delFile({ item, index })}>
                                <Ionicons name="md-close-circle" size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                        : item.format.sound
                            ? <TouchableOpacity style={{}} onPress={() => reproduce(item)}>
                                <Ionicons name="musical-notes-outline" size={30} color="#9F4ADE" />
                            </TouchableOpacity>
                            : <TouchableOpacity style={{}} onPress={() => reproduce(item)}>
                                <Ionicons name="play-outline" size={60} color="#9F4ADE" />
                            </TouchableOpacity>
                }
                }
            />
            <TouchableOpacity
                style={[{ padding: 10, backgroundColor: "#9F4ADE", marginTop: 15, borderRadius: 5 }]}
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
        borderColor: '#9F4ADE',
        borderWidth: 0.5,
        marginBottom: 15,
        paddingHorizontal: 5
    },
    viewFile: {

    }
});
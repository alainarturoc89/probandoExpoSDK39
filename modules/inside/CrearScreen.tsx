import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInput, View, TouchableOpacity, Text, FlatList, Image, Ionicons } from '../../components/Elements';

export default function CrearScreen({ ...props }) {

    const [title, onChangeTitle] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    const [images, onChangeImages] = React.useState([]);

    function crear() {
        if (title !== "" && description !== "") {
            props.crear({ title, description, images });
        } else {
            Alert.alert(
                "Importante",
                "Existen datos sin especificar",
                [{ text: "Cerrar" }],
                { cancelable: true }
            );
        }
    }

    function cargarImage(uri: string) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {console.log(xhr.response);
                    resolve(xhr.response);
                }
            }
            xhr.open("GET", uri);
            xhr.responseType = "blob";
            xhr.send();
        })
    }

    async function loadFile() {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (resultPermissions) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
                base64: true
            });
            if (!result.cancelled) {
                let localUri = result.uri;
                let filename = localUri.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                let base64 = result.base64;
                let image = { uri: localUri, name: filename, type, base64 };
                cargarImage(localUri)
                    .then(file => {
                        console.log(file)
                    })
                    .catch(error => {
                        console.log(error)
                    })

                //onChangeImages(images => [...images, image]);
            }
        }

    }

    function delFile(file: any) {
        onChangeImages(images.filter(item => item !== file.item));
    }

    function open(item: any) {
        return "";
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
                data={images}
                keyExtractor={(item: object, index: number) => index.toString()}
                numColumns={2}
                renderItem={({ item, index, separators }) => {
                    return <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => open(item)}>
                            <Image source={{ uri: item.uri }} style={{ margin: 15, width: 150, height: 150 }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: -30, marginTop: 5 }} onPress={() => delFile({ item, index })}>
                            <Ionicons name="md-close-circle" size={30} color="red" />
                        </TouchableOpacity>
                    </View>
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
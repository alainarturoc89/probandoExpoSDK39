import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInput, View, TouchableOpacity, Text, FlatList, Image, Ionicons, ActivityIndicator } from '../../components/Elements';

export default function CrearScreen({ ...props }) {

    const [title, onChangeTitle] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    const [images, onChangeImages] = React.useState([]);
    const [imagesLocal, onChangeImagesLocals] = React.useState([]);
    const [loading, onChangeLoading] = React.useState(false);

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

    async function uploadImageAsync(uri: string, name: string) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        let refs = global.firebase.storage().ref().child(props.refe + name);
        const snapshot = await refs.put(blob);
        return await snapshot.ref.getDownloadURL();
    }

    async function loadFile() {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (resultPermissions) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });
            if (!result.cancelled) {
                onChangeLoading(true);
                let localUri = result.uri;
                let filename = localUri.split('/').pop();
                const uploadUrl = await uploadImageAsync(localUri, filename);
                let imageLocal = { uri: localUri, type: result.type, filename };
                onChangeImagesLocals(imagesLocal => [imageLocal, ...imagesLocal]);
                let image = { uploadUrl, type: result.type };
                onChangeImages(images => [image, ...images]);
                onChangeLoading(false);
            }
        }
    }

    function delFile(file: any) {
        console.log(file)
        onChangeLoading(true);
        let refs = global.firebase.storage().ref().child(props.refe + file.item.filename);
        refs.delete().then(function () {
            onChangeImagesLocals(imagesLocal.filter(item => item !== file.item));
            onChangeImages(images.filter(item => item.uploadUrl !== file.item.uploadUrl));
            onChangeLoading(false);
        }).catch(function (error) {
            console.log(error);
            onChangeLoading(false);
        });
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
                <Text style={[{ marginRight: 5, color: "#9F4ADE", fontSize: 20, fontFamily: "courgette" }]}>Adjuntar contenido</Text>
                <Ionicons name="md-attach" size={35} color="#9F4ADE" />
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#9F4ADE" />}

            <FlatList
                data={imagesLocal}
                keyExtractor={(item: object, index: number) => index.toString()}
                numColumns={2}
                renderItem={({ item, index, separators }) => {
                    return item.type === "image"
                        ? <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => open(item)}>
                                <Image source={{ uri: item.uri }} style={{ margin: 15, width: 150, height: 150 }}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: -30, marginTop: 5 }} onPress={() => delFile({ item, index })}>
                                <Ionicons name="md-close-circle" size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                        : item.type === "video"
                            ? <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={styles.viewFile} onPress={() => open(item)}>
                                    <Ionicons name="md-videocam" size={80} color="#9F4ADE" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: -30, marginTop: 5 }} onPress={() => delFile({ item, index })}>
                                    <Ionicons name="md-close-circle" size={30} color="red" />
                                </TouchableOpacity>
                            </View>
                            : <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={styles.viewFile} onPress={() => open(item)}>
                                    <Ionicons name="md-musical-notes" size={80} color="#9F4ADE" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: -30, marginTop: 5 }} onPress={() => delFile({ item, index })}>
                                    <Ionicons name="md-close-circle" size={30} color="red" />
                                </TouchableOpacity>
                            </View>
                }
                }
            />
            <TouchableOpacity
                style={[{ padding: 10, backgroundColor: "#9F4ADE", marginTop: 15, borderRadius: 5, marginHorizontal: 20 }]}
                onPress={() => crear()}>
                <Text style={[{ textAlign: "center", color: "#fff", fontSize: 23, fontFamily: "courgette" }]}>Publicar</Text>
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
        paddingHorizontal: 5,
        fontFamily: "courgette",
        fontSize: 17
    },
    viewFile: { width: 150, height: 150, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#9F4ADE", margin: 15 }
});
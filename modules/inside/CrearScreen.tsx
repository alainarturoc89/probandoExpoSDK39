import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { dimensions } from "../../styles/base";
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TextInput, View, TouchableOpacity, Text, FlatList, Image, Ionicons, ActivityIndicator, Modal, ScrollView } from '../../components/Elements';
import { firebase } from "../../hooks/useFirebase";

export default function CrearScreen({ route: { params } }) {

    const [title, onChangeTitle] = React.useState('');

    const [description, onChangeDescription] = React.useState('');

    const [images, onChangeImages] = React.useState([]);

    const [loading, onChangeLoading] = React.useState(false);

    const [modalVisible, changeModalVisible] = React.useState(false);

    const [item, changeItem] = React.useState(null);

    function open(item: any) {

        changeItem(item);

        changeModalVisible(true);

    }

    function cerrar() {

        changeItem(null);

        changeModalVisible(false);

    }

    function crear() {

        if (title !== "" && description !== "") {

            params.crear({ title, description, images, date: params.date, key: params.publicationKey });

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

                reject(new TypeError('Network request failed'));

            };
            xhr.responseType = 'blob';

            xhr.open('GET', uri, true);

            xhr.send(null);

        });

        let refs = await firebase.storage().ref().child(params.refe + name);

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

                let image = { uploadUrl, type: result.type, filename };

                onChangeImages(images => [image, ...images]);

                onChangeLoading(false);

            }
        }
    }

    async function delFile(file: any) {

        onChangeLoading(true);

        let refs = await firebase.storage().ref().child(params.refe + file.item.filename);

        refs.delete().then(function () {

            onChangeImages(images.filter(item => item.uploadUrl !== file.item.uploadUrl));

            onChangeLoading(false);

        })
            .catch(function (error) {

                onChangeLoading(false);

            });
    }

    return (
        <ScrollView style={styles.container}>

            <Text style={[{ fontFamily: "courgette", fontSize: 21, textAlign: "center", marginBottom: 15 }]}>Crear publicación</Text>

            <Text style={[styles.text]}>Título de la publicación *</Text>

            <TextInput
                multiline
                style={[styles.input]}
                onChangeText={text => onChangeTitle(text)}
                value={title} />

            <Text style={[styles.text]}>Descripción de la publicación *</Text>

            <TextInput
                multiline
                style={[styles.input, { height: 150, textAlignVertical: "top" }]}
                onChangeText={text => onChangeDescription(text)}
                value={description} />

            <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", marginHorizontal: 80 }}
                onPress={loadFile}>
               
                <Text style={[{ marginRight: 5, color: "#c96eb7", fontSize: 20, fontFamily: "courgette" }]}>Adjuntar contenido</Text>
               
                <Ionicons name="md-attach" size={35} color="#c96eb7" />
            
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#c96eb7" />}

            <FlatList
                data={images}
                keyExtractor={(item: object, index: number) => index.toString()}
                numColumns={2}
                renderItem={({ item, index, separators }) => {
                    return item.type === "image"
                        ? <View style={{ flexDirection: "row" }}>

                            <TouchableOpacity onPress={() => open(item)}>

                                <Image source={{ uri: item.uploadUrl }} style={{ margin: 15, width: 150, height: 150 }}></Image>

                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginLeft: -30, marginTop: 5 }} onPress={() => delFile({ item, index })}>

                                <Ionicons name="md-close-circle" size={30} color="red" />

                            </TouchableOpacity>

                        </View>
                        : item.type === "video"
                            ? <View style={{ flexDirection: "row" }}>

                                <TouchableOpacity style={styles.viewFile} onPress={() => open(item)}>

                                    <Ionicons name="md-videocam" size={80} color="#c96eb7" />

                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: -30, marginTop: 5 }} onPress={() => delFile({ item, index })}>

                                    <Ionicons name="md-close-circle" size={30} color="red" />

                                </TouchableOpacity>

                            </View>
                            
                            : <View style={{ flexDirection: "row" }}>

                                <TouchableOpacity style={styles.viewFile} onPress={() => open(item)}>

                                    <Ionicons name="md-musical-notes" size={80} color="#c96eb7" />

                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: -30, marginTop: 5 }} onPress={() => delFile({ item, index })}>

                                    <Ionicons name="md-close-circle" size={30} color="red" />
                                
                                </TouchableOpacity>

                            </View>
                }}
            />
            
            <TouchableOpacity
                style={[{ padding: 10, backgroundColor: "#c96eb7", marginTop: 15, borderRadius: 5, marginHorizontal: 20 }]}
                onPress={() => crear()}>

                <Text style={[{ textAlign: "center", color: "#fff", fontSize: 23, fontFamily: "courgette" }]}>Publicar</Text>

            </TouchableOpacity>

            <Modal animationType="slide" visible={modalVisible}>

                <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => cerrar()}>

                    <Ionicons name="md-close-circle" size={70} color="#CD0D0D" />

                </TouchableOpacity>
                {
                    item && <View style={[{ flex: 1, marginVertical: 20 }]}>
                        {
                            item.type === "video"
                                ? <Video
                                    source={{ uri: (item) ? item.uploadUrl : "" }}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="cover"
                                    shouldPlay={true}
                                    isLooping={true}
                                    style={{ height: 100 + "%", marginHorizontal: 10 }}
                                />
                                : <Image
                                    source={{ uri: item.uploadUrl }}
                                    resizeMode="stretch"
                                    style={{ height: dimensions.fullHeight - 100, width: dimensions.fullWidth - 20, marginHorizontal: 10 }}
                                ></Image>
                        }
                    </View>
                }
            </Modal>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    text: { fontFamily: "courgette", fontSize: 18, marginBottom: 2 },
    input: {
        height: 50,
        borderRadius: 3,
        borderColor: '#c96eb7',
        borderWidth: 0.5,
        marginBottom: 15,
        paddingHorizontal: 5,
        fontFamily: "courgette",
        fontSize: 15,
    },
    viewFile: { width: 150, height: 150, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#c96eb7", margin: 15 }
});
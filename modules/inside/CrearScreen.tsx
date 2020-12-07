import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, View, TouchableOpacity, Text, FlatList, Image, Ionicons } from '../../components/Elements';
import Base64 from "../../components/Base64";

export default function CrearScreen({ ...props }) {

    const [title, onChangeTitle] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    const [images, onChangeImages] = React.useState([]);

    function crear() {
        props.crear({ title, description, images });
        /*  if (title !== "" && description !== "") {
              props.crear({ title, description, images });
          } else {
              Alert.alert(
                  "Importante",
                  "Existen datos sin especificar",
                  [{ text: "Cerrar" }],
                  { cancelable: true }
              );
          }*/
    }

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = Base64.atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    async function loadFile() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            base64: true
        });
        if (!result.cancelled) {
            let aux = result.uri.split(".");
            let type = typeDocument(aux[aux.length - 1]);
            let base64 = "data:[" + type.contentType + "][;base64]," + result.base64;
            let image = { base64, type, uri: result.uri };
            onChangeImages(images => [...images, image]);
            /* await fetch(result.uri)
                 .then(res => {
                     console.log(res)
                 })*/
            //  const blob = await imageData.blob();
            // console.log(imageData)
            /* const imageData = await fetch(result.uri);
             const blob = await imageData.blob();*/

            const blob = b64toBlob(result.base64, type.contentType);
            const blobUrl = URL.createObjectURL(blob);
            console.log(blobUrl)

        }
    }

    function delFile(file: any) {
        onChangeImages(images.filter(item => item !== file.item));
    }

    function reproduce(item: any) {
        return "";
    }

    function typeDocument(type: any) {
        const image = ["png", "jpg", "jpeg"];
        const sound = ["mpeg", "mp3", "ogg"];
        const video = ["mp4", "avi"];
        return { contentType: "image/" + type, image: true };
        /* if (image.includes(type))
             res = { contentType: "image/" + type, image: true };
         else if (sound.includes(type))
             res = { contentType: "audio/" + type, sound: true };
         else if (video.includes(type))
             res = { contentType: "video/" + type, video: true };*/
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
                    return item.type.image
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
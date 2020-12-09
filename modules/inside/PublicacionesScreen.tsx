import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, FlatList, View, Image, Text, TouchableOpacity, Modal, ScrollView, Ionicons } from '../../components/Elements';
import * as FileSystem from 'expo-file-system';

import PublicacioneScreen from "./PublicacionScreen";
import CrearScreen from "./CrearScreen";

export default function PublicacionesScreen({ ...props }) {
  const [loaded, changeLoaded] = React.useState(false);
  const [modalVisible, changeModalVisible] = React.useState(false);
  const [createType, changeCreateType] = React.useState(true);
  const [data, changeData] = React.useState([]);
  const [item, changeItem] = React.useState(null);

  if (!loaded) {
    changeLoaded(true);
    global.firebase.database().ref('publications').on("value", function (snapshot: any) {
      if (snapshot.val())
        changeData(Object.values(snapshot.val()));
    }, function (errorObject: any) {
      console.warn("Error al obtener las publicaciones");
    });
  }

  async function create() {
    changeCreateType(true);
    changeItem(null);
    changeModalVisible(true);
  }

  async function show(item: any) {
    changeCreateType(false);
    changeItem(item);
    changeModalVisible(true);
  }

  async function cerrar() {
    changeCreateType(true);
    changeItem(null);
    changeModalVisible(false);
  }

  async function crear(el: any) {
    changeCreateType(true);
    changeItem(null);
    changeModalVisible(false);
    var newPublicationKey = global.firebase.database().ref('publications').push().key;
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    let fecha = [day, month, year].join('-');
    let images = [];
    if (el.images.length) {
      for (var i = 0; i < el.images.length; i++) {
        let ref = 'images/' + newPublicationKey + "/" + fecha + '_' + i;
        let contentType = el.images[i].type;
        let uri = el.images[i].uri;
        let base64 = `data:[${contentType}][;base64], ${el.images[i].base64}`;
        uploadStoragePromise(ref, base64, contentType, uri);
        images.push(ref);
      }
    }
    /* var publication = {
       date: [day, month, year].join('/'),
       description: el.description,
       images,
       title: el.title,
       key: newPublicationKey,
       user: "alain",
     };
     var updates = {};
     updates['/publications/' + newPublicationKey] = publication;
     updates['/users/' + 'alain' + '/publications/' + newPublicationKey] = publication;
 
     global.firebase.database().ref().update(updates);*/
  }

  function cargarImage(uri: string) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      }
      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    })
  }

  function uploadStoragePromise(ref: string, base64: string, type: string, uri: string) {
    return new Promise(function (resolve, reject) {
      cargarImage(uri)
        .then(file => {
          console.log(file)
          /* let refe = global.firebase.storage().ref().child(ref);
           refe.put(file);*/
        })
        .catch(error => {
          console.log(error)
        })
    });
  }

  const renderItem = ({ item }) => {
    return <TouchableOpacity style={styles.item} onPress={() => show(item)}>
      {(item.avatar_url && item.avatar_url !== "")
        ? <Image source={item.avatar_url} style={styles.image} />
        : <Image source={require("../../assets/images/publicacion.png")} style={styles.image} />
      }
      <View style={{ marginLeft: 15 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => create()}>
        <Ionicons name="md-add-circle" size={70} color="#9F4ADE" />
      </TouchableOpacity>
      <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.title} />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => { }}
      >
        <View style={[{ flex: 1, marginVertical: 20 }]}>
          <ScrollView>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => cerrar()}>
              <Ionicons name="md-close-circle" size={70} color="#9F4ADE" />
            </TouchableOpacity>
            {(createType)
              ? <CrearScreen crear={crear} />
              : <PublicacioneScreen item={item} />
            }
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  item: {
    borderWidth: 0.5, borderRadius: 3, borderColor: "#9F4ADE",
    padding: 10,
    flexDirection: "row",
    alignItems: "center", marginBottom: 3, marginHorizontal: 3
  },
  image: { height: 40, width: 40 },
  title: { fontSize: 17, fontWeight: "bold", color: "#9F4ADE" },
  date: { fontSize: 15, color: "#9F4ADE" },
});
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, FlatList, View, Image, Text, TouchableOpacity, Modal, ScrollView } from '../../components/Elements';

import PublicacioneScreen from "./PublicacionScreen";
import CrearScreen from "./CrearScreen";

export default function PublicacionesScreen({ ...props }) {
  const [loaded, changeLoaded] = React.useState(false);
  const [modalVisible, changeModalVisible] = React.useState(false);
  const [createType, changeCreateType] = React.useState(true);
  const [data, changeData] = React.useState([]);
  const [item, changeItem] = React.useState(null);

  React.useEffect(() => {
    if (!loaded) {
      changeLoaded(true);
      global.firebase.database().ref('publications').on("value", function (snapshot: any) {
        changeData(snapshot.val());
      }, function (errorObject: any) {
        console.warn("Error al obtener las publicaciones");
      });
    }
  });

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
        style={[{ padding: 10, backgroundColor: "#9F4ADE", marginBottom: 10, borderRadius: 5, marginHorizontal: 25 }]}
        onPress={() => create()}>
        <Text style={[{ textAlign: "center", color: "#fff", fontSize: 17, fontWeight: "bold" }]}>Crear publicación</Text>
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
              style={[{ padding: 10, backgroundColor: "#9F4ADE", marginBottom: 10, borderRadius: 5, marginHorizontal: 25 }]}
              onPress={() => cerrar()}>
              <Text style={[{ textAlign: "center", color: "#fff", fontSize: 17, fontWeight: "bold" }]}>Cerrar</Text>
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
  container: { flex: 1, backgroundColor: '#fff', paddingVertical: 20 },
  item: {
    borderWidth: 0.5, borderRadius: 3, borderColor: "gray",
    padding: 10,
    flexDirection: "row",
    alignItems: "center", marginBottom: 3
  },
  image: { height: 40, width: 40 },
  title: { fontSize: 17, fontWeight: "bold", color: "#9F4ADE" },
  date: { fontSize: 15, color: "#9F4ADE" },
});
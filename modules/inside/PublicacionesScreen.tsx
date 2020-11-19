import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { SafeAreaView, FlatList, View, Image, Text, } from '../../components/Elements';

export default function PublicacionesScreen({ ...props }) {
  const [loaded, changeLoaded] = React.useState(false);
  const [data, changeData] = React.useState([]);
  function getPublicaciones() {
    firebase.initializeApp((global as any).firebaseConfig);
    firebase.database().ref('publications').on("value", function (snapshot: any) {
      changeData(snapshot.val());
    }, function (errorObject: any) {
      console.warn("Error al obtener las publicaciones");
    });
  }

  if (!loaded) {
    changeLoaded(true);
    getPublicaciones();
  }

  const renderItem = ({ item }) => {
    return <View style={styles.item}>
      {(item.avatar_url && item.avatar_url !== "")
        ? <Image source={item.avatar_url} style={styles.image} />
        : <Image source={require("../../assets/images/publicacion.png")} style={styles.image} />
      }
      <View style={{ marginLeft: 15 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 25, marginBottom: 20, color: "#9F4ADE", fontWeight: "bold" }}>Publicaciones en línea</Text>
      <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.title} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingVertical: 20 },
  item: {
    borderWidth: 0.5, borderRadius: 3, borderColor: "gray",
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  image: { height: 40, width: 40 },
  title: { fontSize: 17, fontWeight: "bold", color: "#9F4ADE" },
  date: { fontSize: 15, color: "#9F4ADE" },
});
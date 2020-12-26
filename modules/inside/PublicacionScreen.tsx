import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Text, View, FlatList, Image, TouchableOpacity, Ionicons, Modal, TextInput } from '../../components/Elements';
import { dimensions } from "../../styles/base";
import { firebase } from "../../hooks/useFirebase";
import { sendPushNotification } from "../../hooks/useNotifications";

export default function PublicacionScreen({ route: { params } }) {

  const [modalVisible, changeModalVisible] = React.useState(false);

  const [item, changeItem] = React.useState(null);

  const [createCommentaryVisible, changeCreateCommentaryVisible] = React.useState(false);

  const [commentary, changeCommentary] = React.useState('');

  const [rating, changeRating] = React.useState(0);

  const [loadedRatings, changeLoadedRatings] = React.useState(false);

  const [ratings, changeRatings] = React.useState([]);

  async function getRatings() {

    if (!loadedRatings) {

      let aux = new Array;

      await firebase.database().ref('ratings/' + params.item.key).once('value').then((snapshot) => {

        changeLoadedRatings(true);

        if (snapshot.val())
          aux = Object.values(snapshot.val()).reverse();

        changeRatings(aux);

      });

    }

  }

  getRatings();

  function open(item: any) {

    changeItem(item);

    changeModalVisible(true);

  }

  function cerrar() {

    changeItem(null);

    changeModalVisible(false);

  }

  async function createRating() {

    var aux = {

      commentary,

      email: global.user.email,

      rating

    };

    var updates = {};

    updates[`ratings/${params.item.key}/${global.user.uid}`] = aux;

    await firebase.database().ref().update(updates);

    sendPushNotification({ title: 'Nuevo comentario', body: `${global.user.email} ha comentado una publicación` });

    changeCommentary("");

    changeRating(0);

    changeLoadedRatings(false);

    changeCreateCommentaryVisible(false);

  }

  function cancelRating() {

    changeCommentary("");

    changeRating(0);

    changeCreateCommentaryVisible(false);

  }

  function showCreate() {

    let uid = global.user.uid;

    if (params.item.uid === uid) {

      return false;

    } else {

      let found = true;

      let length = ratings.length;

      let email = global.user.email;

      for (var i = 0; i < length; i++) {

        if (ratings[i].email === email) {

          found = false;

          break;

        }

      }

      return found;
    }

  }

  const renderItem = ({ item }) => {

    return <View style={[styles.itemRating]}>

      <View style={[styles.first]} >

        <Text style={styles.email}>{item.email}</Text>

        <Text style={styles.rating}>{item.rating}</Text>

        <Ionicons name="ios-star" size={25} color="#FFC300" />

      </View>

      <Text style={styles.commentary}>{item.commentary}</Text>

    </View>

  };

  return (

    <View style={styles.container}>

      <Text style={[styles.title]}>{params.item.title}</Text>

      <Text style={[styles.description, { marginHorizontal: 5 }]}>{params.item.description}</Text>

      {
        params.item.images && <FlatList
          data={params.item.images}
          keyExtractor={(item: object, index: number) => index.toString()}
          numColumns={2}
          renderItem={({ item, index }) => {

            return <TouchableOpacity style={styles.viewFile} onPress={() => open(item)}>

              {item.type === "image"

                ? <Image source={{ uri: item.uploadUrl }}
                  style={{ width: 120, height: 120 }}></Image>

                : item.type === "video"

                  ? <Video
                    source={{ uri: item.uploadUrl }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay={false}
                    style={{ width: 120, height: 120 }}
                  />

                  : <Ionicons name="md-musical-notes" size={80} color="#c96eb7" />

              }

            </TouchableOpacity>

          }
          }
        />
      }

      <View style={[{ flexDirection: "row", marginHorizontal: 3, alignItems: "center", marginTop: 20 }]} >

        <View style={[{ flex: 0.5, flexDirection: "row", alignItems: "center" }]}>

          <Text style={[styles.titleRatings, { marginRight: 10 }]}>Comentarios</Text>

          <Ionicons name="md-chatbubbles" size={30} color="#FFC300" />

        </View>

        {showCreate() && <View style={[{ flex: 0.5, alignItems: "flex-end" }]}>

          <TouchableOpacity
            style={[{ width: 50, height: 50 }]}
            onPress={() => changeCreateCommentaryVisible(true)}>

            <Ionicons name="md-add-circle" size={45} color="#c96eb7" />

          </TouchableOpacity>

        </View>}

      </View>

      {createCommentaryVisible && <View style={[styles.viewCreate]}>

        <Text style={[styles.text]}>CREAR COMENTARIO</Text>

        <TextInput
          placeholder="Comentario... *"
          multiline
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          onChangeText={text => changeCommentary(text)}
          value={commentary} />

        <Text style={[styles.text]}>CALIFICAR</Text>

        <Text style={[styles.textNumbers, { fontSize: 25, color: (rating <= 2) ? "#F90704" : (rating == 3) ? "#FF7802" : (rating == 4) ? "#FCF800" : "#67FC00" }]}>{rating}</Text>

        <View style={[{ flexDirection: "row", alignItems: "center" }]}>

          <Text style={[styles.textNumbers]}>0</Text>

          <Slider
            style={{ flex: 0.8 }}
            step={1}
            disabled={false}
            value={rating}
            onSlidingComplete={val => changeRating(val)}
            minimumValue={0}
            maximumValue={5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />

          <Text style={[styles.textNumbers]}>5</Text>

        </View>

        <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15 }]}>

          <TouchableOpacity
            style={[{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#A79AA7", borderRadius: 5, marginRight: 4 }]}
            disabled={(commentary !== "") ? false : true}
            onPress={() => createRating()}>

            <Text style={[{ textAlign: "center", color: "#fff", fontSize: 20, fontFamily: 'courgette' }]}>Comentar</Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={[{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#A79AA7", borderRadius: 5, marginLeft: 4 }]}
            onPress={() => cancelRating()}>

            <Text style={[{ textAlign: "center", color: "#fff", fontSize: 20, fontFamily: 'courgette' }]}>Cancelar</Text>

          </TouchableOpacity>

        </View>

      </View>}

      <FlatList data={ratings} renderItem={renderItem} keyExtractor={item => item.email} style={[{ marginBottom: 10 }]} />

      <Modal animationType="slide" visible={modalVisible}>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => cerrar()}>

          <Ionicons name="md-close-circle" size={70} color="#CD0D0D" />

        </TouchableOpacity>

        {
          item && <View style={[{ flex: 1, marginVertical: 10 }]}>

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

    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 19, fontFamily: "courgette", marginTop: 10, marginHorizontal: 5 },
  description: { fontSize: 17, fontFamily: "courgette", marginVertical: 5, },
  viewFile: { width: 120, height: 120, margin: 15, marginTop: 5 },
  titleRatings: { fontSize: 20, fontFamily: "courgette", marginVertical: 10 },
  itemRating: { backgroundColor: "#E7E2E7", padding: 10, borderWidth: 0.5, borderColor: "#BAB9BA", borderRadius: 5, marginHorizontal: 3, marginBottom: 3 },
  first: { flex: 0.70, flexDirection: "row" },
  email: { fontSize: 15, fontFamily: "notoSerif-bold", flex: 0.95 },
  rating: { fontSize: 15, fontFamily: "notoSerif-bold", flex: 0.05 },
  commentary: { fontSize: 15, fontFamily: "notoSerif-italic", marginTop: 5 },
  viewCreate: { zIndex: 5, position: "absolute", left: 20, right: 20, top: 20, bottom: 20, backgroundColor: "#c96eb7", paddingVertical: 20, paddingHorizontal: 15, borderRadius: 10, justifyContent: "center" },
  text: { fontFamily: "courgette", fontSize: 18, marginBottom: 10, textAlign: "center", color: "#fff" },
  textNumbers: { fontFamily: "courgette", fontSize: 20, flex: 0.1, textAlign: "center", color: "#fff" },
  input: { backgroundColor: "#fff", height: 50, borderRadius: 3, borderColor: '#c96eb7', borderWidth: 0.5, marginBottom: 15, paddingHorizontal: 5, fontFamily: "courgette", fontSize: 15, },
});
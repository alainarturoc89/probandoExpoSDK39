import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, FlatList, Image, TouchableOpacity, Ionicons } from '../../components/Elements';

export default function PublicacionScreen({ ...props }) {

  function open(item: any) {

  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.title, { flex: 0.7 }]}>{props.item.title}</Text>
        <Text style={[styles.date, { flex: 0.3 }]}>{props.item.date}</Text>
      </View>
      <Text style={[styles.description]}>{props.item.description}</Text>
      {
        props.item.images && <FlatList
          data={props.item.images}
          keyExtractor={(item: object, index: number) => index.toString()}
          numColumns={2}
          renderItem={({ item, index }) => {
            return item.type === "image"
              ? <Image
                source={{ uri: item.uploadUrl }}
                style={{ margin: 15, width: 150, height: 150 }}
              ></Image>
              : item.type === "video"
                ? <TouchableOpacity style={styles.viewFile} onPress={() => open(item)}>
                  <Ionicons name="md-videocam" size={80} color="#9F4ADE" />
                </TouchableOpacity>
                : <TouchableOpacity style={styles.viewFile} onPress={() => open(item)}>
                  <Ionicons name="md-musical-notes" size={80} color="#9F4ADE" />
                </TouchableOpacity>
          }
          }
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", textDecorationLine: "underline" },
  date: { fontSize: 15, fontWeight: "700" },
  description: { fontSize: 17, fontWeight: "500" },
  viewFile: { width: 150, height: 150, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#9F4ADE", margin: 15 }
});
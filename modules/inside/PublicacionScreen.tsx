import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, FlatList, Image } from '../../components/Elements';

export default function PublicacionScreen({ ...props }) {
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
            return <Image
              source={{ uri: item.uploadUrl }}
              style={{ margin: 15, width: 150, height: 150 }}
            ></Image>
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
  description: { fontSize: 17, fontWeight: "500" }
});
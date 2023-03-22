import { useContext, useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppContext from "../Providers/AppContext";

import db from "../Providers/Database";

const RenderItem = ({ item: { name, description, price, image } }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.menuItem}>
        <View style={styles.menuInfo}>
          <View>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View>
            <Text style={styles.body}>{description}</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>${price}</Text>
          </View>
        </View>
        <View style={styles.menuPicture}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ height: 100, width: 100, resizeMode: "cover" }}
            ></Image>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const getMenu = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM menu;",
        [],
        (_tx, { rows: { _array } }) => resolve(_array),
        (_tx, e) => reject(e)
      );
    });
  });
};

const populateMenu = (items) => {
  const _items = items.map(
    (e) =>
      `("${e.id}", "${e.category}","${e.description}","${e.image}","${e.price}","${e.name}")`
  );
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO menu (id, category, description, image, price, name) VALUES " +
          _items.join(",") +
          ";",
        [],
        (_tx, r) => resolve(r),
        (_tx, e) => reject(e)
      );
    });
  });
};

export default function SplashScreen() {
  const { appState, setAppState } = useContext(AppContext);

  const [menu, setMenu] = useState([]);

  const getData = async (url) => {
    try {
      const data = await fetch(url);
      return await data.json();
    } catch (e) {
      return [];
    }
  };

  useEffect(() => {
    getMenu()
      .then((data) => {
        if (data.length) {
          setMenu(data);
        } else {
          getData(
            "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
          ).then((data) => {
            if (typeof data === "object" && data.menu && data.menu.length) {
              const itemsList = data.menu.map((e, index) => {
                e.image = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${e.image}?raw=true`;
                e.id = index;
                return e;
              });
              populateMenu(itemsList)
                .then((d) => {
                  setMenu(itemsList);
                })
                .catch((e) => console.log(e.message));
            }
          });
        }
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Image
          source={require("./../assets/Logo.png")}
          style={{
            width: "50%",
            height: 70,
            resizeMode: "contain",
            marginHorizontal: 10,
          }}
        />
        {appState.User.image && (
          <Image
            source={{ uri: appState.User.image }}
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
              borderRadius: 100,
              marginHorizontal: 10,
            }}
          />
        )}
      </View>
      <View>
        <Text>Filters</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={menu}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 10,
  },
  menuInfo: {
    flex: 4,
  },
  menuPicture: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
    marginBottom: 10,
  },
});

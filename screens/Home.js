import { useEffect, useRef, useState } from "react";
import {
  Image,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";

import CtmFilter from "../Components/CtmFilter";

import Styles, { gray } from "../Providers/Styles";

import { AntDesign } from "@expo/vector-icons";

import {
  getMenu,
  populateMenu,
  getCategories,
  filterItems,
} from "./../Providers/DBMenu";
import { SafeAreaView } from "react-native-safe-area-context";

const RenderItem = ({ item: { name, description, price, image } }) => {
  return (
    <TouchableWithoutFeedback>
      <View style={Styles.menuItem}>
        <View style={Styles.menuInfo}>
          <View>
            <Text style={[Styles.title, Styles.textGreen]}>{name}</Text>
          </View>
          <View>
            <Text style={[Styles.body, Styles.textGray, { marginBottom: 10 }]}>
              {description}
            </Text>
          </View>
          <View>
            <Text style={[Styles.subTitle, Styles.textGreen]}>${price}</Text>
          </View>
        </View>
        <View style={Styles.menuPicture}>
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

export default function SplashScreen() {
  const [menu, setMenu] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const debaunseRef = useRef();

  const getData = async (url) => {
    try {
      const data = await fetch(url);
      return await data.json();
    } catch (e) {
      return [];
    } finally {
    }
  };

  const filter = () => {
    filterItems(categoriesFilter, keyWord)
      .then((data) => setMenu([...data]))
      .catch((e) => {
        Alert.alert(
          "Error",
          "An error occurs while trying to filter information"
        );
      })
      .finally(() => {});
  };

  const debounce = (cb, delay = 500) => {
    return (...arg) => {
      if (debaunseRef.current) clearTimeout(debaunseRef.current);
      debaunseRef.current = setTimeout(() => {
        cb(...arg);
      }, delay);
    };
  };

  const filterByKeyWord = debounce((text) => {
    console.log(text);
    filter();
  });

  useEffect(() => {
    getMenu()
      .then((data) => {
        if (data.length) {
          setMenu([...data]);
        } else {
          console.log("No Datos");
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
                  setMenu([...itemsList]);
                })
                .catch((e) => console.log(e.message));
            }
          });
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories([...data]);
      })
      .catch((e) => {
        setCategories([...[]]);
      });
  }, [menu]);

  useEffect(() => {
    filterByKeyWord(keyWord);
  }, [keyWord]);

  useEffect(() => {
    filter();
  }, [categoriesFilter]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={[HomeStyles.heroBanner, { padding: 10 }, Styles.bgGreen]}>
        {!keyboardStatus && (
          <>
            <View>
              <Text style={[Styles.textYellow, Styles.title, { fontSize: 40 }]}>
                Little Lemon
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 5 }}>
                <View>
                  <Text style={[Styles.textWhite, Styles.title]}>Chicago</Text>
                </View>
                <View>
                  <Text style={[Styles.textWhite, Styles.body]}>
                    We are a family owned Mediterranean restaurant, focused on
                    traditional recipes served whit a modern twist.
                  </Text>
                </View>
              </View>
              <View style={{ flex: 4 }}>
                <Image
                  source={require("./../assets/HeroImage.png")}
                  style={HomeStyles.heroImage}
                />
              </View>
            </View>
          </>
        )}
        <View
          style={[
            Styles.bgWhite,
            {
              flexDirection: "row",
              padding: 10,
              marginTop: 20,
              borderRadius: 16,
            },
          ]}
        >
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            style={[
              Styles.textGreen,
              Styles.subTitle,
              { marginHorizontal: 10, flex: 1 },
            ]}
            onChangeText={(t) => setKeyWord(t)}
            placeholder="Type here to find your dish"
          />
        </View>
      </View>
      <View style={[HomeStyles.filterBox, { padding: 10 }]}>
        <Text style={[Styles.title, { marginBottom: 10 }, Styles.textGreen]}>
          ORDER FOR DELIVERY!
        </Text>
        <CtmFilter
          values={categoriesFilter}
          setter={setCategoriesFilter}
          categories={categories}
        />
      </View>
      <FlatList
        data={menu}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  filterBox: {
    borderBottomColor: gray,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  heroBanner: {},
  heroImage: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
    borderRadius: 20,
  },
});

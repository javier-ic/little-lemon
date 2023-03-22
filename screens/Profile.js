import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import UserApp from "../Providers/User";
import AppContext from "./../Providers/AppContext";
import CtmInputText from "../Components/CtmInputText";
import CtmButton from "../Components/CtmButton";

export default function ProfileScreen() {
  const { appState, setAppState } = useContext(AppContext);

  const handlerSetter = (key, value) => {
    appState.User[key] = value;
    setAppState(appState);
  };

  const handlerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const uri = result.assets[0].uri;
        appState.User["image"] = uri;
        setAppState({ ...appState });
      } catch (e) {
        Alert.alert("Error", e.message);
      }
    }
  };

  const handlerImageRemove = () => {
    appState.User["image"] = "";
    setAppState({ ...appState });
  };

  const saveInfo = async () => {
    console.log(appState);
    await AsyncStorage.mergeItem("user", JSON.stringify(appState.User));
    Alert.alert("Done", "Your info was saved");
  };

  const reset = async () => {
    const original = await AsyncStorage.getItem("user");
    let User = JSON.parse(original);
    setAppState({ ...appState, User });
  };

  const logOut = async () => {
    try {
      await AsyncStorage.multiRemove(["user"]);
      UserApp.fetchUser(appState, setAppState);
      Alert.alert("Sign Out", "Good By!");
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const initials = (firstName, lastName) => {
    try {
      return (
        String(firstName).substring(0, 1) + String(lastName).substring(0, 1)
      );
    } catch (e) {
      return ":)";
    }
  };

  if (!appState.User) {
    return <></>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 16,
        }}
      >
        <View style={{ padding: 20 }}>
          <View>
            <Text style={{ fontSize: 26, fontWeight: "bold" }}>
              Profile Page
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 16, color: "gray" }}>Avatar</Text>

              {appState.User.image ? (
                <Image
                  source={{ uri: appState.User.image }}
                  style={[styles.image, { resizeMode: "cover" }]}
                ></Image>
              ) : (
                <View style={styles.image}>
                  <Text style={{ fontSize: 45, color: "white" }}>
                    {initials(
                      appState.User.firstName || "",
                      appState.User.lastName || ""
                    )}
                  </Text>
                </View>
              )}
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <CtmButton label="Change" action={handlerImage}></CtmButton>
            </View>
            <View>
              <CtmButton label="Remove" action={handlerImageRemove}></CtmButton>
            </View>
          </View>
          <View>
            <CtmInputText
              label="First name"
              value={appState.User.firstName}
              setter={(v) => {
                handlerSetter("firstName", v);
              }}
            />
            <CtmInputText
              label="Last name"
              value={appState.User.lastName}
              setter={(v) => {
                handlerSetter("lastName", v);
              }}
            />
            <CtmInputText
              label="Email"
              keyboardType="email-address"
              value={appState.User.email}
              setter={(v) => {
                handlerSetter("email", v);
              }}
            />
            <CtmInputText
              label="Phone number"
              value={appState.User.phoneNumber}
              keyboardType="numeric"
              mask="(999)-999-9999"
              isMask={true}
              placeholder="(999)-999-9999"
              setter={(v) => {
                handlerSetter("phoneNumber", v);
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <CtmButton label="Discar changes" action={reset} />
            </View>
            <View>
              <CtmButton label="Save Changes" action={saveInfo} />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <CtmButton label="Log out" action={logOut} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    width: 100,
    height: 100,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#62D6C4",
  },
});

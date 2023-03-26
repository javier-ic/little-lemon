import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import UserApp from "../Providers/User";
import AppContext from "./../Providers/AppContext";

import CtmInputText from "../Components/CtmInputText";
import CtmButton from "../Components/CtmButton";
import CtmCheckbox from "../Components/CtmChekbox";
import CtmAvatar from "../Components/CtmAvatar";

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

  if (!appState.User) {
    return <></>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={135}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <TouchableWithoutFeedback>
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
                <CtmAvatar
                  uri={appState.User.image}
                  firstName={appState.User.firstName}
                  lastName={appState.User.lastName}
                  zoom={2}
                />
              </View>
              <View style={{ marginHorizontal: 20 }}>
                <CtmButton label="Change" action={handlerImage}></CtmButton>
              </View>
              <View>
                <CtmButton
                  label="Remove"
                  action={handlerImageRemove}
                ></CtmButton>
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
                keyboardType="phone-pad"
                mask="(999)-999-9999"
                isMask={true}
                placeholder="(999)-999-9999"
                setter={(v) => {
                  handlerSetter("phoneNumber", v);
                }}
              />
              <Text
                style={{ fontSize: 22, fontWeight: "bold", marginVertical: 15 }}
              >
                Email notification
              </Text>
              <CtmCheckbox
                label="Order statuses"
                value={appState.User.orderStatuses}
                setter={(v) => {
                  handlerSetter("orderStatuses", v);
                  setAppState({ ...appState });
                }}
              />
              <CtmCheckbox
                label="Password changes"
                value={appState.User.passwordChanges}
                setter={(v) => {
                  handlerSetter("passwordChanges", v);
                  setAppState({ ...appState });
                }}
              />
              <CtmCheckbox
                label="Special offers"
                value={appState.User.specialOffers}
                setter={(v) => {
                  handlerSetter("specialOffers", v);
                  setAppState({ ...appState });
                }}
              />
              <CtmCheckbox
                label="Newsletter"
                value={appState.User.newsletter}
                setter={(v) => {
                  handlerSetter("newsletter", v);
                  setAppState({ ...appState });
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 50,
              }}
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
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

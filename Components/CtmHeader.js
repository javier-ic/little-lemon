import { Image, TouchableOpacity, View, Text, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import AppContext from "../Providers/AppContext";
import { useContext } from "react";

import CtmAvatar from "./CtmAvatar";
import Styles, { green } from "../Providers/Styles";

export default function CtmHeader(props) {
  const { appState } = useContext(AppContext);
  const { navigation } = props;

  return (
    <View
      style={[
        Styles.bgWhite,
        { borderBottomColor: green, borderBottomWidth: 1 },
        { paddingTop: Platform.OS === "android" ? 50 : 0 },
      ]}
    >
      <View style={{ flexDirection: "row", paddingBottom: 10 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {navigation.canGoBack() && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons name="arrow-back" size={24} color={green} />
              <Text style={Styles.textGreen}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
        <Image
          source={require("./../assets/Logo.png")}
          style={{ flex: 3, height: 50, resizeMode: "contain" }}
        ></Image>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            {appState && appState.User && (
              <CtmAvatar
                uri={appState.User.image}
                firstName={appState.User.firstName}
                lastName={appState.User.lastName}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

import { Image, View, Text } from "react-native";
import Styles from "../Providers/Styles";

import AppContext from "../Providers/AppContext";
import { useContext } from "react";

export default function CtmHeader(props) {
  const { appState } = useContext(AppContext);
  const { route } = props;
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}></View>
        <Image
          source={require("./../assets/Logo.png")}
          style={{ flex: 3, height: 50, resizeMode: "contain" }}
        ></Image>
        <View style={{ flex: 1, alignItems: "center" }}>
          {appState && appState.User && appState.User.image && (
            <Image
              source={{ uri: appState.User.image }}
              style={{
                width: 50,
                height: 50,
                resizeMode: "cover",
                borderRadius: 100,
              }}
            ></Image>
          )}
        </View>
      </View>
      <View>
        <Text
          style={[
            Styles.textGreen,
            Styles.body,
            { textAlign: "center", padding: 5 },
          ]}
        >
          {route.name}
        </Text>
      </View>
    </View>
  );
}

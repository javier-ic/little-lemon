import { Image, View } from "react-native";
import Styles from "../Providers/Styles";

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("./../assets/Logo.png")}
        style={{ width: "90%", height: "90%", resizeMode: "contain" }}
      />
    </View>
  );
}

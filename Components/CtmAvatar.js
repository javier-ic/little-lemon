import { Image, StyleSheet, View, Text } from "react-native";

export default function CtmAvatar(props) {
  const { uri, firstName, lastName, zoom } = {
    uri: undefined,
    firstName: "",
    lastName: "",
    zoom: 1,
    ...props,
  };
  const width = 50 * zoom;
  const height = 50 * zoom;

  const initials = (firstName, lastName) => {
    try {
      return (
        String(firstName).substring(0, 1) + String(lastName).substring(0, 1)
      );
    } catch (e) {
      return ":)";
    }
  };

  if (uri) {
    return (
      <Image
        source={{ uri: uri }}
        style={[
          styles.image,
          { width: width, height: height },
          { resizeMode: "cover" },
        ]}
      ></Image>
    );
  } else {
    return (
      <View style={[styles.image, { width: width, height: height }]}>
        <Text style={{ fontSize: 22 * zoom, color: "white" }}>
          {initials(firstName || "", lastName || "")}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#62D6C4",
  },
});

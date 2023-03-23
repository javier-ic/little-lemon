import { StyleSheet } from "react-native";

const gray = "#777777";
const yellow = "#f1d149";
const green = "#4d5c57";
const white = "#EDEFEE";

const Styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    borderBottomColor: gray,
    borderBottomWidth: 1,
    padding: 20,
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
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
  },
  bgGreen: {
    backgroundColor: green,
  },
  bgYellow: {
    backgroundColor: yellow,
  },
  bgGray: {
    backgroundColor: gray,
  },
  bgWhite: {
    backgroundColor: white,
  },
  textYellow: {
    color: yellow,
  },
  textGreen: {
    color: green,
  },
  textGray: {
    color: gray,
  },
  textWhite: {
    color: white,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export { Styles as default, green, yellow, white, gray };

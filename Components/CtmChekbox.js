import { Text, View } from "react-native";
import CheckBox from "expo-checkbox";

export default function CtmCheckbox(props) {
  const { label, value, setter, disabled } = {
    label: "Check me",
    value: false,
    disabled: false,
    setter: () => {},
    ...props,
  };
  return (
    <View style={{ flexDirection: "row", margin: 10 }}>
      <CheckBox value={value} onValueChange={setter}></CheckBox>
      <Text
        style={{
          fontSize: 20,
          color: disabled ? "gray" : "black",
          textAlign: "center",
          marginLeft: 20,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

import { TextInput, View, Text, StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

export default function CtmInputText(props) {
  const { label, value, setter, isMask, mask, placeholder, keyboardType } = {
    label: "",
    value: "",
    isMask: false,
    mask: "",
    placeholder,
    keyboardType: "default",
    setter: () => {},
    ...props,
  };

  let input = null;

  if (isMask) {
    input = (
      <MaskedTextInput
        mask={mask}
        keyboardType={keyboardType}
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={(text, rawText) => setter(rawText)}
      />
    );
  } else {
    input = (
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        onChangeText={setter}
        placeholder={placeholder}
      ></TextInput>
    );
  }
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.label}>{label}</Text>
      {input}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    height: 50,
    padding: 10,
    color: "gray",
    marginBottom: 10,
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
    marginLeft: 10,
  },
});

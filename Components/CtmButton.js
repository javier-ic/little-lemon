import { Text, StyleSheet, Pressable } from "react-native";

export default function CtmButton(props) {
  const { label, action, disabled } = {
    label: "Button",
    action: () => {},
    disabled: false,
    ...props,
  };
  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: disabled ? "#E8E8EC" : "#495E57" },
      ]}
      disabled={disabled}
      onPress={action}
    >
      <Text
        style={{
          fontSize: 20,
          color: disabled ? "black" : "white",
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: "100%",
  },
});

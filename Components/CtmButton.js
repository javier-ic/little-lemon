import { Text, Pressable } from "react-native";

export default function CtmButton(props) {
  const { label, action, disabled } = {
    label: "Button",
    action: () => {},
    disabled: false,
    ...props,
  };
  return (
    <Pressable
      style={{
        backgroundColor: disabled ? "#E8E8EC" : "#495E57",
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 15,
        width: "100%",
      }}
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

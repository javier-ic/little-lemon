import { View, Image, Text, TextInput, Pressable, Alert } from "react-native";
import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppContext from "./../Providers/AppContext";
import User from "../Providers/User";

export default function OnboardingScreen() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const { appState, setAppState } = useContext(AppContext);

  const validFirstName = () => {
    return /^[a-zA-Z\s]+$/.test(firstName);
  };

  const validEmail = () => {
    return /^([\w\-\.\_]+)(@){1}([\w]+)(\.)([\w\.]+)$/.test(email);
  };

  const send = async () => {
    if (validEmail && validFirstName) {
      try {
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            firstName,
            email,
          })
        );
        User.fetchUser(appState, setAppState);
      } catch (e) {
        Alert.alert(
          "Error",
          "An error occurs trying to save your information."
        );
      }
    } else {
      Alert.alert(
        "Error",
        "Please, validate your information, you have some mistake"
      );
    }
  };
  return (
    <>
      <View
        style={{
          flex: 2,
          backgroundColor: "#DEE3E9",
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={require("./../assets/Logo.png")}
          style={{
            width: "80%",
            height: "100%",
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
      </View>
      <View
        style={{
          flex: 10,
          backgroundColor: "#CBD2D9",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24 }}>Let us get to know you</Text>
        </View>
        <View style={{ alignItems: "center", paddingVertical: 40 }}>
          <Text style={{ fontSize: 24 }}>First Name</Text>
          <TextInput
            autoComplete="name"
            clearButtonMode="always"
            keyboardType="ascii-capable"
            style={{
              borderColor: "#1E1E1E",
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              width: "80%",
              height: 50,
              fontSize: 24,
            }}
            value={firstName}
            onChangeText={(e) => setFirstName(e)}
          />
          <Text style={{ fontSize: 24 }}>Email</Text>
          <TextInput
            autoComplete="email"
            clearButtonMode="always"
            keyboardType="email-address"
            style={{
              borderColor: "#1E1E1E",
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              width: "80%",
              height: 50,
              fontSize: 24,
            }}
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
        </View>
      </View>
      <View
        style={{
          flex: 3,
          alignItems: "flex-end",
          justifyContent: "center",
          paddingHorizontal: 20,
          backgroundColor: "#DEE3E9",
        }}
      >
        <Text>{JSON.stringify(validEmail)}</Text>
        <Pressable
          style={{
            backgroundColor:
              validEmail() && validFirstName() ? "#F4CF14" : "#CBD2D9",
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 10,
          }}
          disabled={!validEmail() || !validFirstName()}
          onPress={send}
        >
          <Text style={{ fontSize: 24 }}>Next</Text>
        </Pressable>
      </View>
    </>
  );
}

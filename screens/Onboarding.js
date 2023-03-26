import {
  View,
  Text,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppContext from "./../Providers/AppContext";
import User from "../Providers/User";
import CtmInputText from "./../Components/CtmInputText";

import Styles, { gray } from "./../Providers/Styles";

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={110}
      >
        <View style={{ flex: 6 }}>
          <ScrollView style={{ flex: 1 }}>
            <TouchableWithoutFeedback>
              <>
                <View
                  style={[
                    HomeStyles.heroBanner,
                    { padding: 10 },
                    Styles.bgGreen,
                  ]}
                >
                  <View>
                    <Text
                      style={[
                        Styles.textYellow,
                        Styles.title,
                        { fontSize: 40 },
                      ]}
                    >
                      Little Lemon
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 5 }}>
                      <View>
                        <Text style={[Styles.textWhite, Styles.title]}>
                          Chicago
                        </Text>
                      </View>
                      <View>
                        <Text style={[Styles.textWhite, Styles.body]}>
                          We are a family owned Mediterranean restaurant,
                          focused on traditional recipes served whit a modern
                          twist.
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 4 }}>
                      <Image
                        source={require("./../assets/HeroImage.png")}
                        style={HomeStyles.heroImage}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    Styles.bgWhite,
                    {
                      flexDirection: "row",
                      padding: 10,
                      marginTop: 20,
                      borderRadius: 16,
                    },
                  ]}
                ></View>
                <View
                  style={{
                    flex: 10,
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={[
                        Styles.title,
                        Styles.textGreen,
                        { fontSize: 26, paddingBottom: 30 },
                      ]}
                    >
                      Let us get to know you
                    </Text>
                  </View>

                  <View>
                    <Text style={[Styles.textGreen, { fontSize: 24 }]}>
                      First Name
                    </Text>
                    <CtmInputText
                      value={firstName}
                      setter={setFirstName}
                      placeholder="Type your first name"
                    ></CtmInputText>

                    <Text style={[Styles.textGreen, { fontSize: 24 }]}>
                      Email
                    </Text>
                    <CtmInputText
                      keyboardType="email-address"
                      value={email}
                      setter={setEmail}
                      placeholder="Type your email"
                    ></CtmInputText>
                  </View>
                </View>
              </>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "center",
            paddingHorizontal: 20,
            backgroundColor: "#DEE3E9",
          }}
        >
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
      </KeyboardAvoidingView>
    </>
  );
}

const HomeStyles = StyleSheet.create({
  filterBox: {
    borderBottomColor: gray,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  heroBanner: {},
  heroImage: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
    borderRadius: 20,
  },
});

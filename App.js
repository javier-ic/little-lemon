// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";

import { useState, useEffect } from "react";

import SplashScreen from "./Screens/Splash";
import OnboardingScreen from "./Screens/Onboarding";
import Profile from "./Screens/Profile";
import Home from "./Screens/Home";

// Providers
import AppContext from "./Providers/AppContext";
import User from "./Providers/User";

// Components
import CtmHeader from "./Components/CtmHeader";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appState, setAppState] = useState({
    Loading: true,
    OnBoardingComplete: false,
  });

  useEffect(() => {
    User.fetchUser(appState, setAppState);
  }, []);

  if (appState.Loading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppContext.Provider value={{ appState, setAppState }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <NavigationContainer>
              <Stack.Navigator>
                {appState.OnBoardingComplete ? (
                  <>
                    <Stack.Screen
                      name="Home"
                      component={Home}
                      options={{ header: CtmHeader }}
                    />
                    <Stack.Screen
                      name="Profile"
                      component={Profile}
                      options={{ header: CtmHeader }}
                    />
                  </>
                ) : (
                  <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </AppContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

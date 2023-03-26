// import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";

import {
  StyleSheet,
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
import Styles, { white } from "./Providers/Styles";

// Components
import CtmHeader from "./Components/CtmHeader";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appState, setAppState] = useState({
    Loading: true,
    OnBoardingComplete: false,
  });

  const NavigationBarVisible = NavigationBar.useVisibility();

  if (NavigationBarVisible == "visible") {
    NavigationBar.setBackgroundColorAsync(white);
    NavigationBar.setButtonStyleAsync("dark");
  }

  useEffect(() => {
    User.fetchUser(appState, setAppState);
  }, []);

  if (appState.Loading) {
    return <SplashScreen />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[{ flex: 1 }, Styles.bgWhite]}>
        <AppContext.Provider value={{ appState, setAppState }}>
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
                  options={{ header: CtmHeader }}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </AppContext.Provider>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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

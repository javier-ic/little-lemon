import AsyncStorage from "@react-native-async-storage/async-storage";

const User = {
  fetchUser: async (appState, setAppState) => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setAppState({
          ...appState,
          Loading: false,
          User: JSON.parse(user),
          OnBoardingComplete: true,
        });
      } else {
        setAppState({
          ...appState,
          Loading: false,
          OnBoardingComplete: false,
          User: null,
        });
      }
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export default User;

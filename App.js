import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/components/screens/Home";

import Constants from "expo-constants";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VideoPlay from "./src/components/screens/VideoPlay";
import Explore from "./src/components/screens/Explore";
import Subscribe from "./src/components/screens/Subscribe";

import { MaterialIcons } from "@expo/vector-icons";
import SearchScreen from "./src/components/screens/SearchScreen";
import { Provider, useSelector } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer } from "./src/reducers/reducer";
import { themeReducer } from "./src/reducers/themeReducer";

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    headerColor: "#404040",
    iconColor: "white",
    tabIcon: "white",
  },
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    headerColor: "white",
    iconColor: "black",
    tabIcon: "white",
  },
};

const rootReducer = combineReducers({
  cardData: reducer,
  myDarkMode: themeReducer,
});

const store = createStore(rootReducer);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootName = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "explore") {
            iconName = "explore";
          } else if (route.name === "subscribe") {
            iconName = "subscriptions";
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={32} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="explore" component={Explore} />
      <Tab.Screen name="subscribe" component={Subscribe} />
    </Tab.Navigator>
  );
};
export default () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export function Navigation() {
  let currentTheme = useSelector((state) => state.myDarkMode);
  return (
    <Provider store={store}>
      <NavigationContainer
        theme={currentTheme ? CustomDarkTheme : CustomDefaultTheme}
      >
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="rootName" component={RootName} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="video" component={VideoPlay} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

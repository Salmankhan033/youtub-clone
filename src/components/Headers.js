import React from "react";
import { View, Text, Alert } from "react-native";
import Constants from "expo-constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import {
  Entypo,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

const Headers = () => {
  const { colors } = useTheme();
  const myColor = colors.iconColor;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => {
    return state.myDarkMode;
  });
  return (
    <View
      style={{
        height: 45,
        backgroundColor: colors.headerColor,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 4,
        alignItems: "center",
        marginTop: Constants.statusBarHeight,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Entypo
          name="youtube"
          size={32}
          color="red"
          style={{ marginLeft: 10 }}
        />
        <Text style={{ fontSize: 22, marginLeft: 5 }}>Youtube</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: 150,
        }}
      >
        <Ionicons
          name="md-videocam"
          size={32}
          color={myColor}
          onPress={() => {
            navigation.navigate("video");
          }}
        />
        <FontAwesome
          name="search"
          size={32}
          color={myColor}
          onPress={() => {
            navigation.navigate("SearchScreen");
          }}
        />
        <MaterialIcons
          name="account-circle"
          size={32}
          color={myColor}
          onPress={() =>
            dispatch({ type: "change_theme", payload: !currentTheme })
          }
        />
      </View>
    </View>
  );
};

export default Headers;

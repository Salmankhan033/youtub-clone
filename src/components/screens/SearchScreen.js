import React, { useState } from "react";
import Constants from "expo-constants";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MiniCard from "../MiniCard";
import { useSelector, useDispatch } from "react-redux";

// https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyB-Pwo6qdnuZqabQCc13OJcSEjxKLLijZA

const SearchScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const iconColor = colors.iconColor;
  const [value, setValue] = useState("");

  // const [miniCardData, setMiniCardData] = useState([]);
  const dispatch = useDispatch();
  const miniCardData = useSelector((state) => {
    return state.cardData;
  });
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyB-Pwo6qdnuZqabQCc13OJcSEjxKLLijZA`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        dispatch({ type: "add", payload: data.items });

        // setMiniCardData(data.items);
      });
  };
  return (
    <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 5,
          elevation: 5,
          backgroundColor: colors.headerColor,
        }}
      >
        <Ionicons
          style={{ color: iconColor }}
          name="md-arrow-back"
          size={32}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          style={{
            flex: 1,
            width: "70%",
            backgroundColor: "#e6e6e6",
            padding: 5,
            marginLeft: 5,
            marginRight: 5,
          }}
        />
        <Ionicons
          style={{ color: iconColor }}
          name="md-send"
          size={32}
          onPress={() => fetchData()}
        />
      </View>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" color="red" />
      ) : null}
      <FlatList
        data={miniCardData}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => {
          return (
            <MiniCard
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
            />
          );
        }}
      />
    </View>
  );
};

export default SearchScreen;

import React from "react";
import Headers from "../Headers";
import { View, Text, ScrollView, FlatList } from "react-native";
import Card from "../Card";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  const cardData = useSelector((state) => {
    return state.cardData;
  });
  console.warn(cardData);
  return (
    <View style={{ flex: 1 }}>
      <Headers />
      <FlatList
        data={cardData}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => {
          return (
            <Card
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

export default Home;

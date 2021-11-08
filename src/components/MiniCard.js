import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

const MiniCard = (props) => {
  const { colors } = useTheme();
  const textColor = colors.iconColor;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("video", {
          videoId: props.videoId,
          title: props.title,
        })
      }
    >
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg`,
          }}
          style={{
            width: "40%",
            height: 100,
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 18,
              width: Dimensions.get("screen").width / 2,
              color: textColor,
            }}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {props.title}
          </Text>
          <Text
            style={{
              width: Dimensions.get("screen").width / 2,
              color: textColor,
            }}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {props.channelTitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  text1: {},
});

export default MiniCard;

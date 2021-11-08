import React from "react";
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";

const Card = (props) => {
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
      <View>
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg`,
          }}
          style={{
            width: "100%",
            height: 150,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 7,
            marginBottom: 7,
          }}
        >
          <MaterialIcons name="account-circle" size={40} color="#212121" />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 22,
                color: textColor,
                width: Dimensions.get("screen").width - 60,
              }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {props.title}
            </Text>
            <Text style={{ color: textColor }}> {props.channel}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

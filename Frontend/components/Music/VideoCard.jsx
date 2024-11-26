import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const VideoCard = ({
  videoTitle,
  videoThumbnail,
  videoArtist,
  uploadDate,
  onPress,
}) => {
  // State to manage icon toggle (true for active, false for inactive)
  const [isLiked, setIsLiked] = useState(false);

  // Function to toggle the icon state
  const onPressLike = () => {
    setIsLiked(!isLiked);
  };

  // Max length of text using char as param
  const maxLength = 21;
  const truncatedVideoTitle =
    videoTitle.length > maxLength
      ? videoTitle.slice(0, maxLength) + "..."
      : videoTitle;

  return (
    <SafeAreaView className="rounded-lg shadow-md  mb-1 overflow-hidden ">
      {/* Video Information Container */}
      <View className="flex-row items-center justify-between py-2 px-2">
        <TouchableOpacity onPress={onPress}>
          {/* Image Container */}
          <View className="flex-row items-center ">
            <Image
              source={{ uri: videoThumbnail }}
              className="w-20 h-20 rounded-lg"
              resizeMode="cover"
            />

            {/* Text Container */}
            <View className="ml-4 flex-col justify-between ">
              <Text
                className="text-base font-bold text-white/95"
                numberOfLines={1} //Limite à une seule ligne le texte
                ellipsizeMode="tail" // Ajoute '...' à la fin si le texte est trop long
              >
                {truncatedVideoTitle}
              </Text>
              <Text className="text-white/80 text-sm">{videoArtist}</Text>
              <Text className="text-white/60 text-xs">{uploadDate}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* Play and Like Buttons */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity onPress={onPress}>
            <Ionicons name="play-circle" size={35} color="#F5B841" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressLike}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={30}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoCard;

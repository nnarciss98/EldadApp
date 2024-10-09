import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Button,
} from "react-native";

import PlayButton from "./PlayButton";

const VideoCard = ({ videoTitle, videoThumbnail, videoUrl, videoArtist }) => {
  const handlePress = () => {
    Linking.openURL(videoUrl).catch((err) =>
      console.error("Failed to open URL: ", err)
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <View className="flex-row w-full h-[112px] p-5 items-center">
        <View>
          <Image
            source={{ uri: videoThumbnail }}
            className="w-[80px] h-[80px] rounded-full" // Use NativeWind for width and height
            resizeMode="cover"
          />
        </View>

        <View className="mx-5 flex-col justify-center ">
          <Text className="text-lg font-bold">{videoTitle}</Text>
          <Text className="text-gray-500 text-sm">{videoArtist}</Text>
          {/* <PlayButton /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;

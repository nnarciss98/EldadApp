import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const FavoriteVideo = ({
  videoTitle,
  videoThumbnail,
  videoArtist,
  uploadDate,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="m-2 overflow-hidden rounded-lg w-36"
      activeOpacity={0.8}
    >
      <View className="flex-col">
        {/* Video Thumbnail */}
        <Image
          source={{ uri: videoThumbnail }}
          className="w-full h-36 rounded-lg"
          resizeMode="cover"
        />

        {/* Text Container */}
        <View className="w-full  py-2">
          <Text
            className="text-sm font-bold text-white"
            numberOfLines={1} //Limite à une seule ligne le texte
            ellipsizeMode="tail" // Ajoute '...' à la fin si le texte est trop long
          >
            {videoTitle}
          </Text>
          <View className="mt-1">
            <Text className="text-white/80 text-xs">{videoArtist}</Text>
            <Text className="text-white/60 text-xs">{uploadDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteVideo;

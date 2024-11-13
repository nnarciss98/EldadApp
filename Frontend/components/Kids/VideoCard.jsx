import { View, Text, Image, TouchableOpacity } from "react-native";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const VideoCard = ({ videoTitle, videoThumbnail, videoArtist, onPress }) => {
  // Max length of text using char as param
  const maxLength = 21;
  const truncatedVideoTitle =
    videoTitle.length > maxLength
      ? videoTitle.slice(0, maxLength) + "..."
      : videoTitle;

  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{ uri: videoThumbnail }}
        className="w-full h-32 rounded-lg"
        resizeMode="cover"
      />
      <Text
        className="text-base font-bold text-white/95"
        numberOfLines={1} //Limite à une seule ligne le texte
        ellipsizeMode="tail" // Ajoute '...' à la fin si le texte est trop long
      >
        {truncatedVideoTitle}
      </Text>
      <Text className="text-white/80 text-sm">{videoArtist}</Text>
    </TouchableOpacity>
  );
};

export default VideoCard;

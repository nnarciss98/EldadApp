import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const VideoCard = ({ videoTitle, videoThumbnail, videoArtist, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{ uri: videoThumbnail }}
        className="w-full h-48 rounded-lg"
        resizeMode="cover"
      />
      <Text
        className="text-base font-bold text-white/95 mt-1"
        numberOfLines={1} //Limite à une seule ligne le texte
        ellipsizeMode="tail" // Ajoute '...' à la fin si le texte est trop long
      >
        {videoTitle}
      </Text>
      <Text className="text-white/80 text-sm">{videoArtist}</Text>
    </TouchableOpacity>
  );
};

export default VideoCard;

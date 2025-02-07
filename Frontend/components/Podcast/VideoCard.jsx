import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const VideoCard = ({ videoTitle, videoThumbnail, videoArtist, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="mb-4">
      {/* Thumbnail Image */}
      <Image
        source={{ uri: videoThumbnail }}
        className="w-full h-48 rounded-lg"
        resizeMode="cover"
        accessible
        accessibilityLabel={`Thumbnail for video ${videoTitle}`} // Accessibility for screen readers
      />

      {/* Video Title */}
      <Text
        className="text-base font-bold text-white/95 mt-1"
        numberOfLines={1} // Limit text to one line
        ellipsizeMode="tail" // Add '...' if text is too long
      >
        {videoTitle}
      </Text>

      {/* Video Artist */}
      <Text className="text-white/80 text-sm">{videoArtist}</Text>
    </TouchableOpacity>
  );
};

export default VideoCard;

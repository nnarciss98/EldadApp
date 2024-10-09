import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const PlayButton = () => {
  return (
    <TouchableOpacity
      className={`w-20 h-10 bg-red-400 rounded-md justify-center items-center `}
    >
      <Text className="text-white text-center font-psemibold">Play</Text>
    </TouchableOpacity>
  );
};

export default PlayButton;

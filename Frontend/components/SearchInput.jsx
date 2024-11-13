import React, { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View
      className="flex flex-row items-center space-x-4 w-full h-14 bg-transparent rounded-2xl  focus:border focus:border-secondary px-2"
      style={{
        borderColor: "rgba(245, 184, 65, 0.1)", // Using RGBA for border color
        borderWidth: 1, // Border width
      }}
    >
      <TextInput
        className="text-base mt-0.5 flex-1 font-pregular text-white "
        value={query}
        placeholder="Cauta un video"
        placeholderTextColor="#fff"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
        className="p-2 bg-secondary rounded-full" // Optional styling for the button
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

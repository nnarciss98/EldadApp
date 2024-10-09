import React, { useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  SafeAreaView,
} from "react-native";
import VideoCard from "../../components/VideoCard";
import SearchInput from "../../components/SearchInput";

const videoData = [
  {
    id: "1",
    title: "Sample Video 1",
    artist: "Artist name",
    thumbnail: "http://i3.ytimg.com/vi/Td_QxUj84iA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Td_QxUj84iA&list=RDMMTd_QxUj84iA&start_radio=1",
  },
  {
    id: "2",
    title: "Sample Video 1",
    artist: "Artist name",
    thumbnail: "http://i3.ytimg.com/vi/Td_QxUj84iA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Td_QxUj84iA&list=RDMMTd_QxUj84iA&start_radio=1",
  },
  {
    id: "3",
    title: "Sample Video 1",
    artist: "Artist name",
    thumbnail: "http://i3.ytimg.com/vi/Td_QxUj84iA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Td_QxUj84iA&list=RDMMTd_QxUj84iA&start_radio=1",
  },
  {
    id: "4",
    title: "Sample Video 1",
    artist: "Artist name",
    thumbnail: "http://i3.ytimg.com/vi/Td_QxUj84iA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Td_QxUj84iA&list=RDMMTd_QxUj84iA&start_radio=1",
  },
  {
    id: "5",
    title: "Sample Video 1",
    artist: "Artist name",
    thumbnail: "http://i3.ytimg.com/vi/Td_QxUj84iA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Td_QxUj84iA&list=RDMMTd_QxUj84iA&start_radio=1",
  },
  // Other video items...
];

const Music = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a refresh
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View className="mx-3">
      <VideoCard
        videoTitle={item.title}
        videoArtist={item.artist}
        videoThumbnail={item.thumbnail}
        videoUrl={item.url}
      />
    </View>
  );

  // Separator component to add space between items
  const ItemSeparator = () => <View style={{ height: 16 }} />; // Adjust the height for the desired gap

  return (
    <SafeAreaView className="flex-1">
      {/* Refresh control is only needed for the scrollable content */}
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View className="my-1 px-4 space-y-6">
            {/* Search Input */}
            <SearchInput />

            {/* Text component for recent videos */}
            <Text className="text-lg font-pregular text-gray-800 mb-3">
              Cele mai recente
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        initialNumToRender={3} // Render only 3 items initially for performance
        windowSize={10} // For performance optimization on large lists
        ItemSeparatorComponent={ItemSeparator} // Adding space between items
      />
    </SafeAreaView>
  );
};

export default Music;

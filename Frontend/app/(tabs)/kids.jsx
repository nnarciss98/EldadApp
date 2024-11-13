import {
  View,
  FlatList,
  RefreshControl,
  Text,
  Image,
  SafeAreaView,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe"; //To open a modal for reading video card
import { Ionicons } from "@expo/vector-icons"; //Icons
import { useSafeAreaInsets } from "react-native-safe-area-context"; //Used to render all in a safe area view for all screens
import SearchInput from "../../components/SearchInput";
import { images } from "../../constants";
import VideoCard from "../../components/Kids/VideoCard";

const videoData = [
  {
    id: "1",
    title: "Multe motive",
    youtubeId: "t5QQNQTUWnc",
    thumbnail: "https://i3.ytimg.com/vi/t5QQNQTUWnc/maxresdefault.jpg",
    uploadDate: " 21 juin 2024",
    artist: "Eldad KIDS | Misiunea Eldad",
  },
  {
    id: "2",
    title: "Dis de dimineață",
    youtubeId: "7oADCYC6tl8",
    thumbnail: "https://i3.ytimg.com/vi/7oADCYC6tl8/maxresdefault.jpg",
    uploadDate: "21 août 2021",
    artist: "Eldad Kids",
  },
  {
    id: "3",
    title: "Dorința mea",
    youtubeId: "A2ZqU9XHbfU",
    thumbnail: "https://i3.ytimg.com/vi/A2ZqU9XHbfU/maxresdefault.jpg",
    uploadDate: "21 avr. 2023",
    artist: "Eldad Kids",
  },
  {
    id: "4",
    title: "Poți să fii",
    youtubeId: "9T7DM4UPwnU",
    thumbnail: "https://i3.ytimg.com/vi/9T7DM4UPwnU/maxresdefault.jpg",
    uploadDate: "24 mai 2022",
    artist: "Eldad KIDS | Misiunea Eldad",
  },
  {
    id: "6",
    title: "Multe motive",
    youtubeId: "t5QQNQTUWnc",
    thumbnail: "https://i3.ytimg.com/vi/t5QQNQTUWnc/maxresdefault.jpg",
    uploadDate: " 21 juin 2024",
    artist: "Eldad KIDS | Misiunea Eldad",
  },
  {
    id: "7",
    title: "Dis de dimineață",
    youtubeId: "7oADCYC6tl8",
    thumbnail: "https://i3.ytimg.com/vi/7oADCYC6tl8/maxresdefault.jpg",
    uploadDate: "21 août 2021",
    artist: "Eldad Kids",
  },
  {
    id: "8",
    title: "Dorința mea",
    youtubeId: "A2ZqU9XHbfU",
    thumbnail: "https://i3.ytimg.com/vi/A2ZqU9XHbfU/maxresdefault.jpg",
    uploadDate: "21 avr. 2023",
    artist: "Eldad Kids",
  },
  {
    id: "9",
    title: "Poți să fii",
    youtubeId: "9T7DM4UPwnU",
    thumbnail: "https://i3.ytimg.com/vi/9T7DM4UPwnU/maxresdefault.jpg",
    uploadDate: "24 mai 2022",
    artist: "Eldad KIDS | Misiunea Eldad",
  },
  {
    id: "10",
    title: "Multe motive",
    youtubeId: "t5QQNQTUWnc",
    thumbnail: "https://i3.ytimg.com/vi/t5QQNQTUWnc/maxresdefault.jpg",
    uploadDate: " 21 juin 2024",
    artist: "Eldad KIDS | Misiunea Eldad",
  },
  {
    id: "12",
    title: "Dis de dimineață",
    youtubeId: "7oADCYC6tl8",
    thumbnail: "https://i3.ytimg.com/vi/7oADCYC6tl8/maxresdefault.jpg",
    uploadDate: "21 août 2021",
    artist: "Eldad Kids",
  },
  {
    id: "13",
    title: "Dorința mea",
    youtubeId: "A2ZqU9XHbfU",
    thumbnail: "https://i3.ytimg.com/vi/A2ZqU9XHbfU/maxresdefault.jpg",
    uploadDate: "21 avr. 2023",
    artist: "Eldad Kids",
  },
  {
    id: "14",
    title: "Poți să fii",
    youtubeId: "9T7DM4UPwnU",
    thumbnail: "https://i3.ytimg.com/vi/9T7DM4UPwnU/maxresdefault.jpg",
    uploadDate: "24 mai 2022",
    artist: "Eldad KIDS | Misiunea Eldad",
  },
  // Add more video data if needed
];

const { width } = Dimensions.get("window"); // Get screen width

const Kids = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playing, setPlaying] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }} className="bg-primary">
      <View className="mx-4  space-y-1 mb-2">
        <View className="flex justify-between items-center flex-row">
          <View>
            <Text className="text-2xl font-psemibold text-white">Kids</Text>
          </View>
          <View className="justify-center items-center mt-1.5">
            <Image
              source={images.logo} // Replace with your logo image URL
              className="w-12 h-12"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="mx-4">
          <SearchInput />
        </View>
        <View className="flex-row flex-wrap justify-between ">
          {videoData.map((item) => (
            <View key={item.id} className="w-[46%] mx-2 my-3">
              <VideoCard
                videoTitle={item.title}
                videoArtist={item.artist}
                videoThumbnail={item.thumbnail}
                uploadDate={item.uploadDate}
                onPress={() => {
                  setCurrentVideo(item);
                  setModalVisible(true);
                  setPlaying(true);
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Modal for Youtube Player */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 16,
              width: width * 0.9,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              {currentVideo && (
                <Text
                  style={{
                    flex: 1,
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {currentVideo.title}
                </Text>
              )}
              <View style={{ width: 24 }} />
            </View>

            {currentVideo && (
              <YoutubePlayer
                height={(width * 9) / 16}
                width="100%"
                videoId={currentVideo.youtubeId}
                play={playing}
                onChangeState={(state) => {
                  if (state === "ended") {
                    setPlaying(false);
                    setModalVisible(false);
                  }
                }}
              />
            )}

            {/* Video Info */}
            {currentVideo && (
              <View className="">
                <Text className="text-base font-medium text-gray-800">
                  Artist: {currentVideo.artist}
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  Uploaded on: {currentVideo.uploadDate}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Kids;

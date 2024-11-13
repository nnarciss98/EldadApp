import React, { useState } from "react";
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
import YoutubePlayer from "react-native-youtube-iframe"; //To open a modal for reading video card
import { Ionicons } from "@expo/vector-icons";
import SearchInput from "../../components/SearchInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import VideoCard from "../../components/Podcast/VideoCard";
import { images } from "../../constants";

const { width } = Dimensions.get("window"); // Get screen width

const videoData = [
  {
    id: "1",
    title: "...când nu vrei să mai demonstrezi nimic, Dumnezeu te poate folosi",
    youtubeId: "awih4E1e0Og",
    thumbnail: "https://i3.ytimg.com/vi/awih4E1e0Og/maxresdefault.jpg",
    uploadDate: "12 sept. 2018",
    artist: "PodCast Eldad #17",
  },
  {
    id: "2",
    title: "și Pastorii au luptele lor...",
    youtubeId: "Qfp127c5EMk",
    thumbnail: "https://i3.ytimg.com/vi/Qfp127c5EMk/maxresdefault.jpg",
    uploadDate: "5 août 2020",
    artist: "PodCast Eldad #18",
  },
  {
    id: "3",
    title:
      "Proroci adevărați vs proroci mincinoși, Experiente de viata impreuna cu Mișu",
    youtubeId: "cPl7yTODMuE",
    thumbnail: "https://i3.ytimg.com/vi/cPl7yTODMuE/maxresdefault.jpg",
    uploadDate: "13 mars 2020",
    artist: "PodCast Eldad | #9",
  },
  {
    id: "4",
    title: "Fără picioare și fără o mână luptând pentru o viață mai bună",
    youtubeId: "_TsT-VFk6kQ",
    thumbnail: "https://i3.ytimg.com/vi/_TsT-VFk6kQ/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "PodCast Eldad #34",
  },
  {
    id: "5",
    title: "Când strigă un nenorocit, Domnul aude",
    youtubeId: "ckb1co4YB14",
    thumbnail: "https://i3.ytimg.com/vi/ckb1co4YB14/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "PodCast Eldad #48",
  },
  {
    id: "6",
    title: "Folositor până la capătul lumii",
    youtubeId: "YRGwRgLZDc8",
    thumbnail: "https://i3.ytimg.com/vi/YRGwRgLZDc8/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "PodCast Eldad #51",
  },
  {
    id: "7",
    title: "Sunt un bulgaras prea mic",
    youtubeId: "n3oIP25QitU",
    thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "Grupul Eldad Live",
  },
  {
    id: "8",
    title: "Sunt un bulgaras prea mic",
    youtubeId: "n3oIP25QitU",
    thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "Grupul Eldad Live",
  },
  {
    id: "9",
    title: "Sunt un bulgaras prea mic",
    youtubeId: "n3oIP25QitU",
    thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "Grupul Eldad Live",
  },
  {
    id: "10",
    title: "Sunt un bulgaras prea mic",
    youtubeId: "n3oIP25QitU",
    thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "Grupul Eldad Live",
  },
  {
    id: "11",
    title: "Sunt un bulgaras prea mic",
    youtubeId: "n3oIP25QitU",
    thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "Grupul Eldad Live",
  },
];

const Podcast = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playing, setPlaying] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }} className="bg-primary">
      <View className="mx-4  space-y-1 mb-2">
        <View className="flex justify-between items-center flex-row">
          <View>
            <Text className="text-2xl font-psemibold text-white">Podcast</Text>
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
        <View className="">
          {videoData.map((item) => (
            <View key={item.id} className="w-full px-2 my-3">
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

export default Podcast;

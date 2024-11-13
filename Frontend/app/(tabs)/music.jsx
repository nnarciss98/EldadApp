import React, { useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Image,
  Text,
  SafeAreaView,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";
import SearchInput from "../../components/SearchInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { images } from "../../constants";
import VideoCard from "../../components/Music/VideoCard";
import VideoCardHorizontal from "../../components/Music/VideoCardHorizontal";

const { width } = Dimensions.get("window");

const videoData = [
  {
    id: "1",
    title: "Ce minunat e Dumnezeu",
    youtubeId: "IfPkIH_zM0w",
    thumbnail: "https://i3.ytimg.com/vi/IfPkIH_zM0w/maxresdefault.jpg",
    uploadDate: "12 sept. 2018",
    artist: "Eldad & Eldad Kids",
  },
  {
    id: "2",
    title: "Se clatina lumea",
    youtubeId: "Yun5cu4Ie0c",
    thumbnail: "https://i3.ytimg.com/vi/Yun5cu4Ie0c/maxresdefault.jpg",
    uploadDate: "5 août 2020",
    artist: "Grupul Eldad Live",
  },
  {
    id: "3",
    title: "Ne vom aduce mereu aminte",
    youtubeId: "VJVN8QLNIv8",
    thumbnail: "https://i3.ytimg.com/vi/VJVN8QLNIv8/maxresdefault.jpg",
    uploadDate: "13 mars 2020",
    artist: "Grupul Eldad",
  },
  {
    id: "4",
    title: "Sunt un bulgaras prea mic",
    youtubeId: "n3oIP25QitU",
    thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "Grupul Eldad Live",
  },
  {
    id: "5",
    title: "Sunt un bulgaras prea mic",
    youtubeId: "n3oIP25QitU",
    thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "Grupul Eldad Live",
  },
  {
    id: "6",
    title: "Sunt un bulgaras prea mic",
    youtubeId: "n3oIP25QitU",
    thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "Grupul Eldad Live",
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

const dataVideoHorizontal = [
  {
    id: "1",
    title: "Ce minunat e Dumnezeu",
    youtubeId: "IfPkIH_zM0w",
    thumbnail: "https://i3.ytimg.com/vi/IfPkIH_zM0w/maxresdefault.jpg",
    uploadDate: "12 sept. 2018",
    artist: "Eldad & Eldad Kids",
  },
  {
    id: "2",
    title: "Se clatina lumea",
    youtubeId: "Yun5cu4Ie0c",
    thumbnail: "https://i3.ytimg.com/vi/Yun5cu4Ie0c/maxresdefault.jpg",
    uploadDate: "5 août 2020",
    artist: "Grupul Eldad Live",
  },
  {
    id: "3",
    title: "Ne vom aduce mereu aminte",
    youtubeId: "VJVN8QLNIv8",
    thumbnail: "https://i3.ytimg.com/vi/VJVN8QLNIv8/maxresdefault.jpg",
    uploadDate: "13 mars 2020",
    artist: "Grupul Eldad",
  },
  {
    id: "4",
    title: "Sunt un bulgaras prea mic",
    youtubeId: "n3oIP25QitU",
    thumbnail: "https://i3.ytimg.com/vi/n3oIP25QitU/maxresdefault.jpg",
    uploadDate: "14 mai 2021",
    artist: "Grupul Eldad Live",
  },
];

const Music = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playing, setPlaying] = useState(false);
  const insets = useSafeAreaInsets();

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Render vertical list of music
  const renderVerticalItem = ({ item }) => (
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
  );

  // Render horizontal list of favorite music
  const renderHorizontalItem = ({ item }) => (
    <VideoCardHorizontal
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
  );

  // Header Component for the vertical list, including the horizontal list
  const ListHeader = () => (
    <View>
      {/* Horizontal Video List */}
      <View style={{ paddingHorizontal: 16 }}>
        {/* <SearchInput /> */}
        <Text
          style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}
          className="text-gray"
        >
          Favorite
        </Text>
      </View>
      <FlatList
        data={dataVideoHorizontal}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderHorizontalItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 5, paddingBottom: 16 }}
      />
      {/* Spacing between horizontal and vertical lists */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginHorizontal: 16,
          paddingBottom: 4,
        }}
        className="text-gray"
      >
        Vezi mai multe
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: insets.top }}
      className="bg-primary"
    >
      <View className="mx-4  space-y-1 mb-2">
        <View className="flex justify-between items-center flex-row">
          <View>
            <Text className="text-2xl font-psemibold text-white">Muzica</Text>
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
      {/* Main Vertical FlatList */}
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.id}
        renderItem={renderVerticalItem}
        ListHeaderComponent={ListHeader} // Header containing the horizontal list
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        windowSize={10}
      />

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
              <View>
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

export default Music;

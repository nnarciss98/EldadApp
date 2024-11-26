import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";
import VideoCard from "../../components/Podcast/VideoCard";
import { images } from "../../constants";
import CONFIG from "../../constants/config";

const { width } = Dimensions.get("window");
const API_URL = `${CONFIG.BASE_URL}/api/v1/media/findAll/PODCAST`;

const Podcast = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playing, setPlaying] = useState(false);

  // Fetch data from API
  const fetchPodcasts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        title: item.ytTitle,
        youtubeId: item.ytId,
        thumbnail: `https://i3.ytimg.com/vi/${item.ytId}/maxresdefault.jpg`,
        uploadDate: item.ytUploadDate,
        artist: "Podcast Eldad", // Placeholder or fetch dynamically if available
      }));
      setPodcasts(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading podcasts...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }} className="bg-primary">
      <View className="mx-4 space-y-1 mb-2">
        <View className="flex justify-between items-center flex-row">
          <Text className="text-2xl font-psemibold text-white">Podcast</Text>
          <Image
            source={images.logo}
            className="w-12 h-12"
            resizeMode="cover"
          />
        </View>
      </View>
      <ScrollView>
        <View>
          {podcasts.map((item) => (
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
      {/* Modal for YouTube Player */}
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

export default Podcast;

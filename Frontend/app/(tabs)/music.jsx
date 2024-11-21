import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { images } from "../../constants"; // Replace with your logo or other assets
import VideoCard from "../../components/Music/VideoCard";
import FavoriteVideo from "../../components/Music/FavoriteVideo";
import CONFIG from "../../constants/config";

const { width } = Dimensions.get("window");

const Music = () => {
  // States to manage the video data, refreshing, loading, modal visibility, etc.
  const [videoData, setVideoData] = useState([]); // Vertical list data
  const [dataVideoHorizontal, setDataVideoHorizontal] = useState([]); // Horizontal list data
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [playing, setPlaying] = useState(false);
  const insets = useSafeAreaInsets();

  // Use the BASE_URL from the CONFIG.js file
  const API_URL = `${CONFIG.BASE_URL}/api/v1/media`;

  // Fetch data from the backend API
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();

      // Separate into vertical and horizontal data
      setVideoData(data); // Assign all data to vertical list
      setDataVideoHorizontal(data.slice(0, 4)); // Use a subset for horizontal list
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was an error fetching the data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setPlaying(false); // Stop playing when closing the modal
  };

  // Render vertical list of videos
  const renderVerticalItem = ({ item }) => (
    <VideoCard
      videoTitle={item.ytTitle}
      videoArtist={item.eldadMediaType} // Display media type as artist
      videoThumbnail={`https://img.youtube.com/vi/${item.ytId}/maxresdefault.jpg`}
      uploadDate={item.ytUploadDate}
      onPress={() => {
        setCurrentVideo(item); // Set the current video to play
        setModalVisible(true); // Show the modal with the video
        setPlaying(true); // Start playing the video
      }}
    />
  );

  // Render horizontal list of favorite videos
  const renderHorizontalItem = ({ item }) => (
    <FavoriteVideo
      videoTitle={item.ytTitle}
      videoArtist={item.eldadMediaType}
      videoThumbnail={`https://img.youtube.com/vi/${item.ytId}/maxresdefault.jpg`}
      uploadDate={item.ytUploadDate}
      onPress={() => {
        setCurrentVideo(item);
        setModalVisible(true);
        setPlaying(true);
      }}
    />
  );

  // Header for the vertical list, including the horizontal list
  const ListHeader = () => (
    <View>
      <View className="px-4">
        <Text className="text-lg font-psemibold text-[#F5B841] mb-2">
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
      <Text className="px-4 text-lg font-psemibold text-[#F5B841] mb-1">
        Vezi mai toate
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (videoData.length === 0) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-primary">
        <Text>No videos available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-primary"
    >
      <View className="mx-4 space-y-2 mb-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-pbold text-white">Muzica</Text>
          <Image
            source={images.logo} // Replace with your logo image URL
            className="w-12 h-12"
            resizeMode="cover"
          />
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
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              {currentVideo && (
                <Text style={styles.modalTitle}>{currentVideo.ytTitle}</Text>
              )}
              <View style={{ width: 24 }} />
            </View>

            {currentVideo && (
              <YoutubePlayer
                height={(width * 9) / 16}
                width="100%"
                videoId={currentVideo.ytId}
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
              <View style={styles.videoInfo}>
                <Text style={styles.artistText}>
                  Artist: {currentVideo.eldadMediaType}
                </Text>
                <Text style={styles.uploadDateText}>
                  Uploaded on: {currentVideo.ytUploadDate}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// CSS styles for the modal
const styles = {
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    width: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  videoInfo: {
    marginTop: 16,
  },
  artistText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  uploadDateText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
};

export default Music;

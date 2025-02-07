import {
  View,
  Text,
  Image,
  SafeAreaView,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import YoutubePlayer from "react-native-youtube-iframe"; // To open a modal for reading video card
import { Ionicons } from "@expo/vector-icons"; // Icons
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Used to render all in a safe area view for all screens
import SearchInput from "../../components/SearchInput";
import { images } from "../../constants";
import VideoCard from "../../components/Kids/VideoCard";
import CONFIG from "../../constants/config"; // Assuming CONFIG contains the BASE_URL

const { width } = Dimensions.get("window"); // Get screen width

const Kids = () => {
  const [videoData, setVideoData] = useState([]); // State to store fetched video data
  const [loading, setLoading] = useState(true); // Loading state
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [currentVideo, setCurrentVideo] = useState(null); // Currently selected video
  const [playing, setPlaying] = useState(false); // Playing state for Youtube player

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading state to true when fetching
      const response = await fetch(
        `${CONFIG.BASE_URL}/api/v1/media/findAll/KIDS`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      // Transform the data into a format that can be used for the video card
      const transformedData = data.map((item) => ({
        id: item.id,
        title: item.ytTitle, // ytTitle as video title
        youtubeId: item.ytId, // ytId as video ID for Youtube
        thumbnail: `https://i3.ytimg.com/vi/${item.ytId}/maxresdefault.jpg`, // Use ytId to generate thumbnail URL
        uploadDate: item.ytUploadDate, // ytUploadDate as the upload date
        artist: "Eldad Kids", // Placeholder for artist
      }));

      // Set transformed data to state
      setVideoData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert(
        "Error",
        "There was an error fetching the data. Please try again later."
      );
    } finally {
      setLoading(false); // Set loading state to false when done
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }} className="bg-primary">
      <View className="mx-4 space-y-1 mb-2">
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

        {loading ? (
          <Text className="text-white text-center mt-10">Loading...</Text> // Show loading text
        ) : (
          <View className="flex-row flex-wrap justify-between">
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
        )}
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

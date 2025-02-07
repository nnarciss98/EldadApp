import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

import CONFIG from "../../constants/config";

const Test = () => {
  const [data, setData] = useState(null); // For storing fetched JSON data
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    // Fetch JSON data from the API
    fetch(`${CONFIG.BASE_URL}/api/v1/media`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((json) => {
        console.log("Fetched JSON data:", json); // Log the response for debugging
        setData(json); // Directly set the fetched array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      });
  }, []); // Empty dependency array means this runs only once when the component mounts

  const renderItem = ({ item }) => {
    // Generate YouTube thumbnail URL using the ytId
    const thumbnailUrl = `https://img.youtube.com/vi/${item.ytId}/hqdefault.jpg`;

    return (
      <View style={styles.card}>
        <Text style={styles.videoTitle}>{item.ytTitle}</Text>
        <Text style={styles.videoInfo}>Uploaded on: {item.ytUploadDate}</Text>

        {/* Display YouTube Thumbnail */}
        <Image
          source={{ uri: thumbnailUrl }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Videos from Backend</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : data ? (
        // Use FlatList to render the list of videos
        <FlatList
          data={data} // Pass the data to FlatList
          keyExtractor={(item) => item.id} // Use unique id for key
          renderItem={renderItem} // Define how each item is rendered
        />
      ) : (
        // Show loading indicator while waiting for the data
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center", // Center align the content
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  videoInfo: {
    fontSize: 14,
    color: "gray",
  },
  thumbnail: {
    width: 200,
    height: 120,
    marginTop: 10,
    borderRadius: 8,
  },
  error: {
    fontSize: 16,
    color: "red",
  },
});

export default Test;

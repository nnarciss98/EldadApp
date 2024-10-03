import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Dimensions, Image, StatusBar } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Video } from './types';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

const { width } = Dimensions.get('window');

const videos: Video[] = [
  {
    id: '1',
    title: 'Video Title 1',
    youtubeId: 'ifaY8H-EKoA',
    thumbnail: 'https://img.youtube.com/vi/ifaY8H-EKoA/hqdefault.jpg',
    uploadDate: '2023-09-20',
  },
  {
    id: '2',
    title: 'Video Title 2',
    youtubeId: 'laiDgJ0owxI',
    thumbnail: 'https://img.youtube.com/vi/laiDgJ0owxI/hqdefault.jpg',
    uploadDate: '2023-09-21',
  },
  {
    id: '3',
    title: 'Video Title 3',
    youtubeId: '7RcqC-2tdkU',
    thumbnail: 'https://img.youtube.com/vi/7RcqC-2tdkU/hqdefault.jpg',
    uploadDate: '2023-09-22',
  },
  {
    id: '4',
    title: 'Video Title 4',
    youtubeId: 'W1Co2M-gsQE',
    thumbnail: 'https://img.youtube.com/vi/W1Co2M-gsQE/hqdefault.jpg',
    uploadDate: '2023-09-23',
  },
];

const PodcastScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentVideo, setCurrentVideo] = React.useState<Video | null>(null);
  const [playing, setPlaying] = React.useState(false); 

  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: Video }) => (
    <TouchableOpacity
      style={styles.videoContainer}
      onPress={() => {
        setCurrentVideo(item);
        setModalVisible(true);
        setPlaying(true);
      }}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.uploadDate}>{item.uploadDate}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.topBar, { paddingTop: insets.top }]}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            {currentVideo && <Text style={styles.modalTitle}>{currentVideo.title}</Text>}
          </View>

          {currentVideo && (
            <YoutubePlayer
              height={(width * 9) / 16} 
              width={width}
              videoId={currentVideo.youtubeId}
              play={playing}
              onChangeState={(state) => {
                if (state === 'ended') {
                  setPlaying(false);
                }
              }}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 80,
  },
  videoContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  uploadDate: {
    color: 'rgba(0, 0, 0, 0.8)',
    marginTop: 4,
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    elevation: 2,
    zIndex: 1,
  },
  backButton: {
    marginRight: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, 
    textAlign: 'center',
  },
});

export default PodcastScreen;

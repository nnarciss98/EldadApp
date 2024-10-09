import { View, Text, FlatList } from "react-native";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text
          style={{ fontSize: 24, color: "white" }}
        >{`Item ${item.id}`}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;

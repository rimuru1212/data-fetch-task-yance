import React, { useContext, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DataContext } from "../context/DataContext";
import { Post } from "../types/types";

export default function PostsList() {
  const { posts } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        {/* Added description here */}
        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          {item.discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                -{item.discountPercentage}%
              </Text>
            </View>
          )}
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#222",
  },
  searchInput: {
    height: 45,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  thumbnail: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a8917",
  },
  discountBadge: {
    marginLeft: 8,
    backgroundColor: "#f44336",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rating: {
    fontSize: 14,
    color: "#ffb400",
    fontWeight: "600",
  },
  category: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#666",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

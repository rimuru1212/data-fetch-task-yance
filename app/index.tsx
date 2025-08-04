import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import PostsList from "@/components/PostsList";
import { DataContext, DataProvider } from "@/context/DataContext";
import { Post } from "@/types/types";

const AppContent: React.FC = () => {
  const { setPosts } = useContext(DataContext);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      const posts: Post[] = data.products;
      setPosts(posts.slice(0, 30));



    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleReload = () => {
  setPosts([]);
  fetchPosts();
  };

  return (
    <SafeAreaView style={styles.container}>
      <PostsList />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleReload}>
          <Text style={styles.buttonText}>Reload Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Index: React.FC = () => (
  <DataProvider>
    <AppContent />
  </DataProvider>
);

export default Index;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#60677aff", 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 18,
    letterSpacing: 1,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 38,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.7,
  },
});
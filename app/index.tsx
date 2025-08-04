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
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2563EB", 
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

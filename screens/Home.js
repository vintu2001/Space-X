import { StyleSheet, View, FlatList, Text } from "react-native";
import React, { useState, useEffect } from "react";
import LaunchPadDetails from "../components/LaunchPadDetails";

import LottieView from "lottie-react-native";

const Home = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API = "https://api.spacexdata.com/v4/launchpads";

  //function for getting details from API
  const fetchAPI = async () => {
    try {
      const response = await fetch(API);
      const json = await response.json();
      setData(json);
      setIsLoading(false);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  //if loading of data is done then return the list of launchpads
  if (!isLoading) {
    return (
      <View style={{ marginTop: 50 }}>
        <View>
          {/* flatlist for displaying the list of launchpads */}
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <View style={{ alignItems: "center", marginBottom: 18 }}>
                <Text
                  style={{
                    fontSize: 45,
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  SpaceX Launchpads
                </Text>
              </View>
            )}
            renderItem={({ item }) => {
              return (
                <View style={styles.card}>
                  <LaunchPadDetails item={item} navigation={navigation} />
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  } else {
    //if loading of data is not done then return the loading animation
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <LottieView
          source={require("../assets/animations/loader.json")}
          style={styles.animation}
          autoPlay
          loop
        />
        <Text style={styles.loading}>Loading Data</Text>
      </View>
    );
  }
};

export default Home;

const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingHorizontal: 10,
    borderColor: "grey",
    borderWidth: 2,
    marginVertical: 4,
    marginHorizontal: 50,
    alignSelf: "center",
    borderRadius: 25,
    marginBottom: 0,
    // flexDirection: "row"
  },
  loading: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  animation: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
});

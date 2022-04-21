import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import moment from "moment";

import LottieView from "lottie-react-native";

const LaunchDetails = ({ navigation, route }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = route.params.id;

  // function to get details of the launch from the provided id
  const getDetails = async (id) => {
    const API = `https://api.spacexdata.com/v4/launches/${id}`;
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getDetails(id);
  }, []);

  if (!isLoading) {
    // if loading data is done then return the details of the launch
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.heading}>Launch Details</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 40,
          }}
        >
          <Image
            source={{ uri: data.links.patch.large }}
            style={{ height: 250, width: 250 }}
          />
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subHeading}>Name : </Text>
          <Text style={styles.content}>{data.name}</Text>
        </View>

        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.subHeading}>
              Details :{" "}
              {data.details != null ? (
                <Text style={styles.details}>{data.details}</Text>
              ) : (
                <Text style={styles.details}>Deatils Not Available</Text>
              )}
            </Text>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subHeading}>Date : </Text>
          <Text style={styles.content}>
            {moment(data.date_unix * 1000).format("Do MMMM YYYY")}
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subHeading}>Reused : </Text>
          {data.cores[0].reused ? (
            <Text style={styles.green}>Yes</Text>
          ) : (
            <Text style={styles.red}>No</Text>
          )}
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subHeading}>Status : </Text>
          {data.success ? (
            <Text style={{ color: "green", fontSize: 20 }}>Successful</Text>
          ) : (
            <Text style={{ color: "red", fontSize: 20 }}>Failed</Text>
          )}
        </View>

        <View style={{ alignItems: "center", marginBottom: 130 }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.button}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    // showing animation till the data is loaded
    return (
      <View style={styles.animationView}>
        <LottieView
          source={require("../assets/animations/loader.json")}
          style={styles.animation}
          autoPlay
          loop
        />
        <Text style={styles.loading}>Loading Your Location</Text>
      </View>
    );
  }
};

export default LaunchDetails;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
    flex: 1,
  },
  heading: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 15,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  subContainer: {
    marginVertical: 8,
    flexDirection: "row",
    textAlignVertical: "center",
  },
  content: {
    textAlignVertical: "center",
    fontSize: 20,
  },
  button: {
    color: "#fff",
    fontSize: 30,
  },
  loading: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  animation: {
    height: 120,
    width: 120,
    alignSelf: "center",
    margin: 30,
  },
  animationView: {
    flex: 1,
    justifyContent: "center",
  },
  backButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 50,
  },
  green: {
    color: "green",
    fontSize: 20,
  },
  red: {
    color: "red",
    fontSize: 20,
  },
  details: {
    fontSize: 18,
    color: "#000",
    fontWeight: "normal",
  },
});

import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const LaunchPadDetails = ({ navigation, ...props }) => {
  // using 3 different states for 3 launch names
  const [name1, setName1] = useState([]);
  const [name2, setName2] = useState([]);
  const [name3, setName3] = useState([]);

  const item = props.item;

  // getting then name f first 3 launches from the launchpad
  useEffect(async () => {
    if (item.launches.length > 0) {
      getName(item.launches[0]).then((res) => {
        setName1(res.name);
      });
      getName(item.launches[1]).then((res) => {
        setName2(res.name);
      });
      getName(item.launches[2]).then((res) => {
        setName3(res.name);
      });
    }
  }, []);

  // function to get the name of the launch from the provided id
  let getName = async (id) => {
    const API = `https://api.spacexdata.com/v4/launches/${id}`;
    let res = await fetch(API);
    return await res.json();
  };
  return (
    <View>
      {/* showing the image of launchpad */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.images.large[0] }}
          style={styles.displayImage}
          resizeMode="stretch"
        />
      </View>
      {/* showing name */}
      <View style={styles.subContainer}>
        <Text style={styles.subHeading}>Name : </Text>
        <Text style={styles.nameText}>{item.full_name}</Text>
      </View>
      {/* showing details of the laumchpad */}
      <View style={styles.subContainer}>
        <Text style={styles.subHeading}>Details : </Text>
        <Text style={styles.details}>{item.details}</Text>
      </View>
      {/*  showing status of the launchpad */}
      <View style={styles.subContainer}>
        <Text style={styles.subHeading}>Status : </Text>
        <Text style={styles.details}>{item.status}</Text>
      </View>
      {/* showing the name of the first 3 launches from the launchpad */}
      <View style={styles.subContainer}>
        <Text style={styles.subHeading}>Launches : </Text>

        {item.launches.length > 0 ? (
          <View>
            <View>
              {/*  for 1st launch */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LaunchDetails", {
                    id: item.launches[0],
                  });
                }}
              >
                <Text style={styles.launchNos}>{name1}</Text>
              </TouchableOpacity>
              {/*  for 2nd launch */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LaunchDetails", {
                    id: item.launches[1],
                  });
                }}
              >
                <Text style={styles.launchNos}>{name2}</Text>
              </TouchableOpacity>
              {/* for 3rd launch */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LaunchDetails", {
                    id: item.launches[2],
                  });
                }}
              >
                <Text style={styles.launchNos}>{name3}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // if no launches are available then show this
          <Text style={styles.noLaunchText}>No Launch Available</Text>
        )}
      </View>
    </View>
  );
};

export default LaunchPadDetails;

const styles = StyleSheet.create({
  nameText: {
    color: "black",
    fontSize: 20,
  },
  subContainer: {
    flexDirection: "row",
    marginRight: 70,
    margin: 5,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlignVertical: "top",
  },
  launchNos: {
    padding: 5,
    fontSize: 22,
    lineHeight: 20,
    textAlignVertical: "center",
    color: "#332FD0",
    fontWeight: "600",
  },
  details: {
    fontSize: 22,
    textAlignVertical: "center",
    width: "100%",
    color: "#000",
  },
  displayImage: {
    height: 220,
    width: "100%",
    borderRadius: 25,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    width: "100%",
  },
  noLaunchText: {
    textAlignVertical: "center",
    fontSize: 22,
    color: "#FA1E0E",
  },
});

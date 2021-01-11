import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Text, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import database from "../config/firebase_Config";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class ReadStoryScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      Stories: [],
    };
  }

  retriveData = () => {
    database
      .collection("Stories")
      .get()
      .then((documents) => {
        var arr = [];
        for (var stories in documents.docs) {
          arr.push(documents.docs[stories].data());
        }
        this.setState({ Stories: arr, loading: false });
      });
  };

  componentDidMount() {
    this.retriveData();
  }
  render() {
    return (
      <View>
        {this.state.loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="dodgerblue" />
          </View>
        ) : (
          <View>
            <Header
              backgroundColor="tomato"
              centerText="Read Stories"
              textColor="white"
              pressableForRefresh={
                <Icon name="refresh" size={30} color="black" />
              }
              onPressForRefresh={this.retriveData()}
            />

            {!this.state.Stories.length ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 30, fontWeight: "900", marginTop: 250 }}
                >
                  No Data
                </Text>
              </View>
            ) : (
              this.state.Stories.map((stories, key) => (
                <TouchableOpacity>
                  <View
                    key={key}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginTop: 40,
                      borderColor: "purple",
                      borderWidth: 1,
                      margin: 20,
                      padding: 5,
                      backgroundColor: "#FBC02D",
                    }}
                  >
                    <Text style={styles.text}> Title - {stories.Title}</Text>
                    <View>
                      <Text style={styles.text}>
                        Author Name - {stories.Author}
                      </Text>
                    </View>
                    <View style={{ width: 200 }}>
                      <Text numberOfLines={1} style={styles.text}>
                        Story - {stories.Story}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

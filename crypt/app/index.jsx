import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons/faCoins";
import CustomText from "../components/customText";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://127.0.0.1:3000");
socket.on("connect", () => {
  console.log("client connected");
});
const Home = () => {
  const [cryptoList, setCryptoList] = useState([]);

  useEffect(function () {
    socket.on("crypto", (data) => {
      setCryptoList(data);
    });
  }, []);

  function goToDetails(id) {
    console.log(id);
    router.push({
      pathname: "details/[id]",
      params: {
        id,
      },
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E0F0FF" }}>
      <FlatList
        data={cryptoList}
        ListEmptyComponent={() => (
          <ActivityIndicator
            size="small"
            style={{
              height: Dimensions.get("window").height / 1.2,
            }}
          />
        )}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => goToDetails(item.id)}
            >
              <Item item={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

function Item({ item }) {
  return (
    <View style={{ ...styles.flatListContainer, height: 140 }}>
      <View
        style={{
          justifyContent: "space-between",
        }}
      >
        <View>
          <CustomText title={item.name} size={18} weight={"bold"} />
          <CustomText title={item.symbol} size={16} weight={"semibold"} />
        </View>
        <View>
          <CustomText
            title={"$" + Math.round(item.price * 100) / 100}
            size={20}
            weight={"bold"}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon icon={faCoins} size={42} />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: "#F0F8FF",
    marginVertical: 8,
    marginHorizontal: 12,

    padding: 24,

    paddingRight: 28,

    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});

export default Home;

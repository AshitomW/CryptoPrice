import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { styles } from "../index";
import CustomText from "../../components/customText";
import RenderHtml from "react-native-render-html";
import { SERVER_URL } from "../../constants";
const Details = () => {
  const { id } = useLocalSearchParams();
  const [cryptoMarketData, setCryptoMarketData] = useState();
  const [cryptoProfileData, setCryptoProfileData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    Promise.all([
      axios.get(`${SERVER_URL}cryptos/market-data/${id}`),

      axios.get(`${SERVER_URL}cryptos/profile/${id}`),
    ]).then(([resMarketData, resProfileData]) => {
      setCryptoMarketData(resMarketData.data);
      setCryptoProfileData(resProfileData.data);
      setDataLoaded(true);
    });
  }, []);

  if (!dataLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" />
      </View>
    );
  }
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
        }}
      >
        <View>
          <View
            style={{
              ...styles.flatListContainer,
              height: 140,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <CustomText
                  weight={"bold"}
                  size={18}
                  title={cryptoProfileData.name}
                />

                <CustomText
                  weight={"semibold"}
                  size={15}
                  title={cryptoProfileData.symbol}
                />
              </View>
              <CustomText
                weight={"bold"}
                size={20}
                title={
                  "$" +
                  Math.round(cryptoMarketData.market_data.price_usd * 100) / 100
                }
              />
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              <Text>{cryptoProfileData.profile?.general.overview.tagline}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.flatListContainer,
            height: 80,
            padding: 12,
            paddingBottom: 8,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flex: 1,

              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomText
              title={"Percent Change 1h"}
              size={16}
              weight={"normal"}
            />
            <CustomText
              title={
                "%" +
                convertPrice(
                  cryptoMarketData.market_data.percent_change_usd_last_1_hour
                )
              }
              size={16}
              weight={"normal"}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 3,

              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CustomText
              title={"Percent Change 24h"}
              size={16}
              weight={"normal"}
            />
            <CustomText
              title={
                "%" +
                convertPrice(
                  cryptoMarketData.market_data.percent_change_usd_last_24_hours
                )
              }
              size={16}
              weight={"normal"}
            />
          </View>
        </View>
        <View style={{ ...styles.flatListContainer, flexDirection: "column" }}>
          <View>
            <CustomText size={18} weight={"bold"} title={"Overview"} />
            <RenderHtml
              contentWidth={width}
              source={{
                html: cryptoProfileData.profile?.general.overview
                  .project_details,
              }}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <CustomText size={18} weight={"bold"} title={"Background"} />
            <RenderHtml
              contentWidth={width}
              source={{
                html: cryptoProfileData.profile?.general.background
                  .background_details,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

function convertPrice(value) {
  return Math.round(parseFloat(value) * 100) / 100;
}
export default Details;

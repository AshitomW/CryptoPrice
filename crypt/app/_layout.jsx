import { StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams, route } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen name="details/[id]" options={{ title: "Details" }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});

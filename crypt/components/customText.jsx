import { View, Text } from "react-native";
import React from "react";

const CustomText = ({ title, size, weight }) => {
  return (
    <Text
      style={{
        color: "#333",
        fontSize: size,
        fontWeight: weight,
      }}
    >
      {title}
    </Text>
  );
};

export default CustomText;

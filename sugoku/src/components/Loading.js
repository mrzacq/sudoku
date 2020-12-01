import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

function Loading() {
  return (
    <View
      style={{
        display: "flex",
        textAlign: "center",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        marginVertical: 0,
      }}
    >
      <ActivityIndicator size="large" color="#FFFFFF"></ActivityIndicator>
      <Text style={{ fontSize: 25 }}>Loading...</Text>
    </View>
  );
}

export default Loading;

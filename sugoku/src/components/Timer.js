import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";

function Timer() {
  let interval
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState('')

  function startGame() {
    Alert.alert("Game dimulai")
  }
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "5%",
      }}
    >
      <View style={{ width: 80 }}>
        <Button
          mode="contained"
          color="blue"
          onPress={() => startGame()}
          loading={true}
          title="Start"
        ></Button>
      </View>
    </View>
  );
}

export default Timer;

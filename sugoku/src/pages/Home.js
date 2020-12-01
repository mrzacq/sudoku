import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { startGame } from "../store/action/user";
import img from '../../assets/sun-go-kong-131118b.jpg'
function Home(props) {
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Lagi di HOME ini");
  }, []);

  function submit() {
    if (username !== "" && level !== "") {
      console.log(`Selamat datang`, username);
      dispatch(startGame(username, level));
      setUsername("");
      setLevel("");
      props.navigation.navigate("Board");
    } else {
      if (level === "") Alert.alert("Ooops","Please pick level");
      else if (username === "") Alert.alert("Ooops","Who are you?");
      else alert("Pick level and type your username");
    }
  }
  return (
    <View
      style={{
        display: "flex",
        textAlign: "center",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        marginTop: 30
      }}
    >
      <Image source={img} style={{width: 250, height: 250}} />
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        SUNGOKU
      </Text>
      <TextInput
        value={username}
        style={{
          borderBottomColor: "black",
          borderWidth: 1,
          width: 150,
          marginTop: 20,
          marginBottom: 10,
          textAlign: "center",
        }}
        onChangeText={(text) => setUsername(text)}
        placeholder="What is your name?"
      />
      <Text
        style={{
          marginBottom: 20,
          marginTop: 10,
          fontSize: 20,
          fontWeight: "bold",
          color: "red",
        }}
      >
        Pick Level
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View>
          <Button
            mode="contained"
            onPress={() => setLevel("easy")}
            disabled={level === "easy" ? true : false}
          >
            Easy
          </Button>
        </View>
        <View style={{ marginHorizontal: "10%" }}>
          <Button
            mode="contained"
            onPress={() => setLevel("medium")}
            disabled={level === "medium" ? true : false}
          >
            Medium
          </Button>
        </View>
        <View>
          <Button
            mode="contained"
            onPress={() => setLevel("hard")}
            disabled={level === "hard" ? true : false}
          >
            Hard
          </Button>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          textAlign: "center",
          alignSelf: "center",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          marginVertical: 0,
          marginTop: 15
        }}
      >
        <Button
          mode="outlined"
          dark={true}
          onPress={() => submit()}
        >
          Start
        </Button>
      </View>
    </View>
  );
}

export default Home;

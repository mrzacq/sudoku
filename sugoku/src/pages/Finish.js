import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { playAgain } from "../store/action/board";
import img from "../../assets/2e81970e777d3d8ac23da276575013ec.jpg";
import untt from "../../assets/Untitled-1.png";

function Finish(props) {
  const dispatch = useDispatch();
  const isSolved = useSelector(
    (initialState) => initialState.boardReducer.isSolved
  );
  const user = useSelector((initialState) => initialState.userReducer.username)
  useEffect(() => {
    console.log("Finish line");
  }, []);

  function newGame() {
    dispatch(playAgain());
    props.navigation.navigate("Home");
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
        marginTop: 75,
      }}
    >
      <View style={{ display: "flex", justifyContent: "center" }}>
        {(() => {
          if (isSolved) {
            return (
              <View>
                <Image source={img} style={{ width: 250, height: 250, justifyContent: 'center' }} />
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 10
                  }}
                >
                  Hei "{user}", BRAVO
                </Text>
              </View>
            );
          } else {
            return (
              <View>
                <Image source={untt} style={{ width: 250, height: 250 }} />
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    marginTop: 10
                  }}
                >
                  MEH... "{user}" Noob
                </Text>
              </View>
            );
          }
        })()}
      </View>
      <View style={{ marginTop: 10 }}>
        <Button mode="contained" color="blue" onPress={() => newGame()}>
          PLAY AGAIN
        </Button>
      </View>
    </View>
  );
}

export default Finish;

import React, { useState, useEffect } from "react";
import { Text, View, Alert, ToastAndroid } from "react-native";
import { Card, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Square from "../components/Square";
import Timer from "../components/Timer";
import {
  getBoard,
  validateBoard,
  autoSolve,
  changeBoard,
} from "../store/action/board";

function Board(props) {
  const dispatch = useDispatch();

  const boards = useSelector(
    (initialState) => initialState.boardReducer.boards
  );
  const loading = useSelector(
    (initialState) => initialState.boardReducer.isLoading
  );
  const solved = useSelector(
    (initialState) => initialState.boardReducer.isSolved
  );

  const username = useSelector(
    (initialState) => initialState.userReducer.username
  );
  const level = useSelector((initialState) => initialState.userReducer.level);

  const [isStarted, setIsStarted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingSolve, setLoadingSolve] = useState(false);
  const [timer, setTimer] = useState(false);
  
  useEffect(() => {
    console.log("Game dimulai");
    loadBoard()
  }, []);

  function loadBoard(){
    dispatch(getBoard())
  }
  useEffect(() => {
    if (solved) {
      endGame();
    }
  }, [solved]);

  useEffect(() => {
    setLoadingSolve(false);
  }, [boards]);

  useEffect(() => {
    if (loadingSolve) {
      setTimer(true);
    }
  }, [loadingSolve]);

  function startGame() {
    setIsStarted(true);
  }
  function createBoard(value, x, y) {
    dispatch(changeBoard(value, x, y));
    console.log("Board terupdate");
  }

  function endGame() {
    if (!timer || solved) {
      props.navigation.push("Finish");
    }
  }
  const solve = () => {
    const solving = () => {
      setLoadingSolve(true);
      setTimer(true);
      dispatch(autoSolve());
      console.log(setTimer);
    };

    Alert.alert(
      "Why????",
      "You stil have a chance T_T",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => solving(),
        },
      ],
      { cancelable: true }
    );
  };
  const validate = () => {
    setLoadingSubmit(true);
    dispatch(validateBoard())
      .then(() => {
        setLoadingSubmit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const newGame = () => {
    Alert.alert(
      "Leave this match?",
      "You can't revert this!!!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setIsStarted(false);
            props.navigation.navigate("Finish");
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <>
      {(() => {
        if (loading) {
          return (
            <Text style={{ textAlign: "center", marginTop: 50, fontSize: 40 }}>
              Loading...
            </Text>
          );
        } else {
          return (
            <View style={{ display: "flex" }}>
              <Text
                style={{
                  fontSize: 30,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                SUNGOKU
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 320,
                  }}
                >
                  <Card style={{ flex: 1, marginRight: 5 }}>
                    <Text
                      style={{ textAlign: "center", padding: 5, fontSize: 14 }}
                    >
                      Username: {username.toUpperCase()}
                    </Text>
                  </Card>
                  <Card style={{ flex: 1, marginLeft: 5 }}>
                    <Text
                      style={{ textAlign: "center", padding: 5, fontSize: 14 }}
                    >
                      Level: {level.toUpperCase()}
                    </Text>
                  </Card>
                </View>
              </View>

              <Timer
                isStarted={isStarted}
                startGame={startGame}
                endGame={endGame}
                stopTimer={timer}
              />

              {(() => {
                if (isStarted) {
                  return (
                    <>
                      <View>
                        <Square
                          changeBoard={createBoard}
                          boards={boards}
                        ></Square>
                      </View>
                      <View style={{ display: "flex", marginTop: "5%" }}>
                        <View
                          style={{
                            marginBottom: 8,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            mode="contained"
                            color="indigo"
                            loading={loadingSubmit ? true : false}
                            onPress={() => validate()}
                          >
                            {!loadingSubmit ? "Validate" : "Loading..."}
                          </Button>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Button
                            mode="contained"
                            color="orange"
                            loading={loadingSolve ? true : false}
                            onPress={() => solve()}
                          >
                            {!loadingSolve ? "SOLVE IT" : "Loading..."}
                          </Button>
                          <Button
                            mode="contained"
                            color="orange"
                            onPress={() => newGame()}
                          >
                            End Game
                          </Button>
                        </View>
                      </View>
                    </>
                  );
                }
              })()}
            </View>
          );
        }
      })()}
    </>
  );
}

export default Board;

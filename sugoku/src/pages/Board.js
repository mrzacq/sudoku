import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import { Card } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Square from "../components/Square";
import { getBoard } from "../store/action/board";
import Constants from 'expo-constants'


function Board() {
  const boards = useSelector(
    (initialState) => initialState.boardReducer.boards
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoard());
  }, []);

  return (
      <View>
        <Square boards={boards}></Square>
      </View>
  );
}

export default Board;

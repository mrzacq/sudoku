import React from "react";
import { SafeAreaView, FlatList, TextInput, View, Text } from "react-native";

function Square({ boards, changeBoard }) {
  return (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={boards}
        renderItem={({ item, index }) => {
          return (
            <View style={{ display: "flex", flexDirection: "row" }}>
              {item.map((board, y) => {
                if (board > 0) {
                  return (
                    <TextInput
                      key={y}
                      style={{
                        width: 35,
                        height: 35,
                        borderColor: "black",
                        borderWidth: 1,
                        display: "flex",
                        flexDirection: "row",
                        textAlign: "center",
                        alignSelf: "center",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        marginVertical: 0,
                      }}
                      keyboardType={"numeric"}
                      maxLength={1}
                      value={`${board === 0 ? '' : ''}`}
                      onChangeText={(text) => changeBoard(text, index, y)}
                    >
                      {board}
                    </TextInput>
                  );
                } else {
                  return (
                    <TextInput
                      key={y}
                      keyboardType={"numeric"}
                      maxLength={1}
                      style={{
                        width: 35,
                        height: 35,
                        borderColor: "black",
                        borderWidth: 1,
                        display: "flex",
                        flexDirection: "row",
                        textAlign: "center",
                        alignSelf: "center",
                        alignItems: "center",
                        marginVertical: 0,
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                      value={`${board === 0 ? '' : ''}`}
                      onChangeText={(text) => changeBoard(text, index, y)}
                    ></TextInput>
                  );
                }
              })}
            </View>
          );
        }}
        keyExtractor={(item, i) => `${i}`}
      />
    </SafeAreaView>
  );
}

export default Square;

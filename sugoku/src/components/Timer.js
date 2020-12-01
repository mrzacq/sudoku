import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {Button} from 'react-native-paper'

function Timer(props) {
  const {isStarted, startGame, endGame, stopTimer} = props
  let interval
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState('')

  useEffect(() => {
    console.log("Timer dimulai")
  }, [])

  useEffect(() => {
    if(!isStarted){
      clearInterval(interval)
      setLoading(false)
    }
  }, [isStarted])

  useEffect(() => {
    if(stopTimer){
      console.log('times up')
      clearInterval(interval)
    }
  }, [stopTimer])

  function countDown(sec){
    interval = setInterval(() => {
      const menit = Math.floor(sec/60)
      const detik = sec % 60
      const display = `${String(menit).padStart(2,0)} : ${String(detik).padStart(2,0)}`
      sec--
      if(sec<0) {
        clearInterval(interval)
        endGame()
      }
      setTimer(display)
    }, 1000);
  }

  function start(){
    return new Promise((resolve, reject) => {
      resolve(setLoading(true))
    })
    .then(() => {
      setTimeout(() => {
        countDown(600)
        startGame()
      }, 1000)
    })
    .catch(() => setLoading(false))
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
      {(() => {
        if(!isStarted){
          return (
            <View style={{width: 200}}>
              <Button mode="contained" color="red" onPress={() => start()} loading={loading? true: false}>
                {!loading ? "START" : "LOADING..."}
              </Button>
            </View>
          )
        } else {
          return (
            <Text style={{textAlign: 'center', fontSize: 18}}>{timer}</Text>
          )
        }
      })()}
    </View>
  );
}

export default Timer;

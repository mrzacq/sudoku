import React from "react";
import { Provider } from "react-redux";
import Board from "./src/pages/Board";
import Home from "./src/pages/Home";
import Finish from "./src/pages/Finish";
import store from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerLeft: null}} name="Home" component={Home} />
          <Stack.Screen options={{headerLeft: null}} name="Board" component={Board} />
          <Stack.Screen options={{headerLeft: null}} name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
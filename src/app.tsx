import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "mobx-react";
import RootStore from "./store/RootStore";
import RootNavigator from "./navigation/StackNavigator/RootNavigation";

const Navigator = () => {
  const [rootStore] = useState(RootStore);
  return (
    <NavigationContainer>
      <Provider rootStore={rootStore} {...rootStore}>
        <RootNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});

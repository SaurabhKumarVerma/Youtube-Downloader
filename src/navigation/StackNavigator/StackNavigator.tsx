import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/react-navigation";
import { ScreenName } from "../ScreenName/Screen";
import HomeScreen from "../../Screen/Home/HomeScreen";
import VideoDetails from "../../Component/Video/VideoDetails";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenName.INITIAL_SCREEN} component={HomeScreen} />
      <Stack.Screen name={ScreenName.VIDEO_DETAILS} component={VideoDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

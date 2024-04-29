import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/react-navigation";
import { ScreenName } from "../ScreenName/Screen";
import DownloadedVideoScreen from "../../Screen/DownloadedVideoScreen/DownloadedVideoScreen";
import OfflineVideoPlayback from "../../Component/OfflineVideoPlayback/OfflineVideoPlayback";

const OfflineStackNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ScreenName.DOWNLOAD_SCREEN}
    >
      <Stack.Screen
        name={ScreenName.DOWNLOAD_SCREEN}
        component={DownloadedVideoScreen}
      />
    </Stack.Navigator>
  );
};

export default OfflineStackNavigator;

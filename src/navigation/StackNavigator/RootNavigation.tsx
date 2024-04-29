import React, { PropsWithChildren, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/react-navigation";
import { ScreenName } from "../ScreenName/Screen";
import OfflineVideoPlayback from "../../Component/OfflineVideoPlayback/OfflineVideoPlayback";
import BottomNavigator from "../BottomNavigator/BottomNavigator";
import { PropsWithStore } from "../../store/RootStore";
import { inject, observer } from "mobx-react";

const RootNavigator = (props: PropsWithStore<PropsWithChildren>) => {
  const { videoStore } = props.rootStore;

  useEffect(() => {
    videoStore.updateCurrentVideoList();
  }, []);

  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ScreenName.INITIAL_SCREEN}
        component={BottomNavigator}
      />
      <Stack.Screen
        name={ScreenName.OFFLINE_VIDEO_PLAYBACK_SCREEN}
        component={OfflineVideoPlayback}
      />
    </Stack.Navigator>
  );
};

export default inject("rootStore")(observer(RootNavigator));

import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren, useEffect } from "react";
import VideoList from "../../Component/Video/VideoList";
import { inject, observer } from "mobx-react";
import { PropsWithStore } from "../../store/RootStore";

const HomeScreen = (props: PropsWithStore<PropsWithChildren>) => {
  const { offlineDownload, videoStore } = props.rootStore;

  useEffect(() => {
    videoStore.updateCurrentVideoList();
    // offlineDownload.getCachedData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <VideoList />
    </View>
  );
};

export default inject("rootStore")(observer(HomeScreen));

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import DownloadedVideo from "../../Component/DownloadedVideo/DownloadedVideo";
import { PropsWithStore } from "../../store/RootStore";
import { inject, observer } from "mobx-react";

const DownloadedVideoScreen = (props: PropsWithStore<PropsWithChildren>) => {
  return (
    <View>
      <DownloadedVideo />
    </View>
  );
};

export default inject("rootStore")(observer(DownloadedVideoScreen));

const styles = StyleSheet.create({});

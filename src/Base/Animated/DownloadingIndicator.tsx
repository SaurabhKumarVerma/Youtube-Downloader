import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Circle, Svg } from "react-native-svg";
import { inject, observer } from "mobx-react";
import { PropsWithStore } from "../../store/RootStore";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";

interface IDownloadingIndicator {
  isDownloading;
}
const DownloadingIndicator = (
  props: PropsWithStore<PropsWithChildren<IDownloadingIndicator>>
) => {
  useEffect(() => {}, [props.isDownloading]);
  const showDownloadingIndicator = () => {
    if (props.isDownloading) {
      return (
        <View>
          <LottieView
            source={require("../../../assets/lottie/l3.json")}
            style={{ height: 30, width: 30 }}
            loop
            autoPlay
          />
        </View>
      );
    } else {
      return (
        <View>
          <Ionicons name="cloud-download" size={30} />
        </View>
      );
    }
  };

  return <View style={{}}>{showDownloadingIndicator()}</View>;
};

export default inject("rootStore")(observer(DownloadingIndicator));

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

const NoInternet = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  return (
    <View>
      <Text>{isConnected}</Text>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({});

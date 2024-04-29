import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
type Props = {};

const AppHeader = (props: Props) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={() => goBack()}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 8,
          alignItems: "center",
        }}
      >
        <View
          style={{
            margin: 8,
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});

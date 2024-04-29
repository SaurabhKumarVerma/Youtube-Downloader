import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../themes/color";

type Props = {};

const Header = (props: Props) => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.container}>
          <Ionicons name="videocam" size={20} color={colors.white} />
        </View>

        <View style={styles.container}>
          <Ionicons name="people" size={20} color={colors.white} />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,
    backgroundColor: colors.black,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 8,
    alignItems: "center",
  },
});

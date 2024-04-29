import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { AutoImage } from "../../Base/AutoImage/AutoImage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../themes/color";

interface IVideoThumbnail {
  videoUrl: string;
}

const VideoThumbnail = (props: IVideoThumbnail) => {
  const { width } = useWindowDimensions();
  return (
    <View>
      <View>
        <AutoImage
          source={{ uri: props.videoUrl }}
          maxWidth={width - 16}
          style={{ borderRadius: 12 }}
        />
      </View>
      <View style={styles.playButtonContainer}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="play-circle-sharp"
            size={60}
            color={colors.imperialRed}
          />
        </View>
      </View>
    </View>
  );
};

export default VideoThumbnail;

const styles = StyleSheet.create({
  playButtonContainer: {
    position: "absolute",
    flex: 1,
    top: "40%",
    alignSelf: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 30,
  },
});

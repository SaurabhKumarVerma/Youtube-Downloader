import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { AutoImage } from "../../Base/AutoImage/AutoImage";
import VideoThumbnail from "./VideoThumbnail";

interface IRenderVideoList {
  videoThumbnail: string;
  videoTitle: string;
}

const RenderVideoList = (props: IRenderVideoList) => {
  const { width } = useWindowDimensions();
  return (
    <View>
      <View style={styles.posterContainer}>
        <VideoThumbnail videoUrl={props.videoThumbnail} />
      </View>

      <View style={styles.thumbnailContainer}>
        <View>
          <AutoImage
            source={{ uri: props.videoThumbnail }}
            style={styles.thumbnailImageStyle}
          />
        </View>
        <View
          style={{
            width: width - 72,
            marginLeft: 12,
          }}
        >
          <Text numberOfLines={2}>{props.videoTitle}</Text>
        </View>
      </View>
    </View>
  );
};

export default RenderVideoList;

const styles = StyleSheet.create({
  posterContainer: {
    alignContent: "center",
    alignItems: "center",
  },
  thumbnailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  thumbnailImageStyle: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginLeft: 8,
  },
});

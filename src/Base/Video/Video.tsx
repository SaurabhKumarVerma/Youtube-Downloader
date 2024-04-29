import { Platform, View } from "react-native";
import React from "react";
import YoutubeIframe, { YoutubeIframeProps } from "react-native-youtube-iframe";

/**
 * The 'IVideo' interface is defined to extend the 'YoutubeIframeProps' interface, which allows the 'Video' component to accept all the props that 'YoutubeIframe' accepts.
 *
 * @param {IVideo} props - The component props.
 */

interface IVideo extends YoutubeIframeProps {}

const RNVideo = (props: IVideo) => {
  return (
    <View>
      <YoutubeIframe
        {...props}
        webViewStyle={{ opacity: 0.99 }}
        webViewProps={{
          renderToHardwareTextureAndroid: true,
          androidLayerType:
            Platform.OS === "android" && Platform.Version <= 22
              ? "hardware"
              : "none",
        }}
      />
    </View>
  );
};

export default RNVideo;

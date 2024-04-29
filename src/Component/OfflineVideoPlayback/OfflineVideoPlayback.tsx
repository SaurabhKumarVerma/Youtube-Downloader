import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AppHeader from "../../Base/AppHeader";
import Video from "react-native-video";
import { useRoute } from "@react-navigation/native";
import { OfflineVideoScreenProps } from "../../types/react-navigation";
import { colors } from "../../themes/color";
import Orientation, { OrientationType } from "react-native-orientation-locker";
import Ionicons from "react-native-vector-icons/Ionicons";

const OfflineVideoPlayback = () => {
  const route = useRoute<OfflineVideoScreenProps>();
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const videoRef = useRef(null);
  const { height } = useWindowDimensions();

  useEffect(() => {
    const unsubscribe = Orientation.addOrientationListener(handleOrientation);
    return () => {
      unsubscribe;
      setFullScreen(false);
      Orientation.lockToPortrait();
    };
  }, []);

  const handleFullState = () => {
    if (fullScreen) {
      Orientation.unlockAllOrientations();
    } else {
      Orientation.lockToLandscapeLeft();
    }
  };

  const handleOrientation = (orientation: OrientationType) => {
    if (
      orientation === OrientationType["LANDSCAPE-RIGHT"] ||
      orientation === OrientationType["LANDSCAPE-LEFT"]
    ) {
      setFullScreen(true);
      StatusBar.setHidden(false);
    } else {
      setFullScreen(false);
      StatusBar.setHidden(true);
    }
  };

  const handleOnEnd = () => {
    setFullScreen(false);
    StatusBar.setHidden(true);
    Orientation.lockToPortrait();
  };

  return (
    <ScrollView>
      {fullScreen ? null : <AppHeader />}

      <View>
        <Video
          ref={videoRef}
          source={{ uri: route.params.videoMetaData.path }}
          style={[styles.video, { height: fullScreen ? height : 300 }]}
          controls
          fullscreen
          resizeMode={"stretch"}
          onEnd={handleOnEnd}
        />
        <TouchableOpacity
          onPress={handleFullState}
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            paddingRight: 12,
            paddingTop: 12,
          }}
        >
          <Ionicons
            name={fullScreen ? "phone-portrait" : "phone-landscape"}
            size={30}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      {fullScreen ? null : (
        <View style={{ marginHorizontal: 16, marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>
            {route.params.videoMetaData.video_Title}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default OfflineVideoPlayback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  controlButton: {
    marginHorizontal: 10,
    fontSize: 18,
    color: colors.black,
  },
  video: {
    flex: 1,
    width: "100%",
  },
});

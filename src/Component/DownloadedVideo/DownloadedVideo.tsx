import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { inject, observer } from "mobx-react";
import { PropsWithStore } from "../../store/RootStore";
import SimilarVideoList from "../Video/SimilarVideoList";
import { IDownloadedVideo } from "../../types/interface/youtubeList.interface";
import AppHeader from "../../Base/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../navigation/ScreenName/Screen";
import _ from "lodash";

const DownloadedVideo = (props: PropsWithStore<PropsWithChildren>) => {
  const { videoPlayerStore, offlineDownload } = props.rootStore;
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();

  const navigateToVideoPlayer = (item) => {
    navigate(ScreenName.OFFLINE_VIDEO_PLAYBACK_SCREEN, {
      videoMetaData: item,
    });
  };

  const renderItem = (item: IDownloadedVideo) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToVideoPlayer(item)}
        style={[styles.container, { width: width - 80 }]}
      >
        <SimilarVideoList
          thumbnail={item.thumbnail_Link}
          videoId={item.videoId}
          videoTitle={item.video_Title}
        />
      </TouchableOpacity>
    );
  };

  const noOffLineVideoAvailable = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          No Downloaded Video
        </Text>
      </View>
    );
  };
  return (
    <View style={{ marginHorizontal: 8 }}>
      <AppHeader />
      <FlatList
        data={_.uniqBy(offlineDownload.metaData, "videoId")}
        keyExtractor={(item, index) => item.videoId}
        renderItem={({ item }) => renderItem(item)}
        ListEmptyComponent={noOffLineVideoAvailable}
        extraData={offlineDownload.metaData}
        refreshing={offlineDownload.isVideoDownloading}
      />
    </View>
  );
};

export default inject("rootStore")(observer(DownloadedVideo));

const styles = StyleSheet.create({
  backgroundVideo: {
    // position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});

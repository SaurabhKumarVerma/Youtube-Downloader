import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { PropsWithChildren, useEffect } from "react";
import {
  RootStackParamList,
  VideoDetailsScreenRouteProp,
} from "../../types/react-navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import RNVideo from "../../Base/Video/Video";
import { inject, observer } from "mobx-react";
import { PropsWithStore } from "../../store/RootStore";
import { IVideoInfo } from "../../types/interface/youtubeList.interface";
import SimilarVideoList from "./SimilarVideoList";
import DownloadingIndicator from "../../Base/Animated/DownloadingIndicator";
import DropDown from "../../Base/Dropdown/DropDown";
import AppHeader from "../../Base/AppHeader";
import { ScreenName } from "../../navigation/ScreenName/Screen";
import Toast, { ToastProps } from "react-native-toast-message";

interface IVideoDetails {}

const { height } = Dimensions.get("window");
const VideoDetails = (
  props: PropsWithStore<PropsWithChildren<IVideoDetails>>
) => {
  const route = useRoute<VideoDetailsScreenRouteProp>();
  const { videoPlayerStore, videoStore, offlineDownload } = props.rootStore;
  const { navigate } = useNavigation<RootStackParamList>();

  useEffect(() => {
    videoPlayerStore.setIsPlaying(true);
    videoStore.getSimilarVideo(route.params.videoId.videoId);
  }, []);

  const navigateToVideoDetails = (id: string) => {
    videoStore.getSimilarVideo(id);
    navigate(ScreenName.VIDEO_DETAILS, {
      videoId: id,
    });
  };

  const renderSimilarVideo = (item: IVideoInfo) => {
    return (
      <TouchableOpacity onPress={() => navigateToVideoDetails(item.videoId)}>
        <SimilarVideoList
          videoTitle={item.video_Title}
          thumbnail={item.thumbnail_Link}
          videoId={item.videoId}
        />
      </TouchableOpacity>
    );
  };

  const toastMessage = () => {
    return Toast.show({
      type: "info",
      text1: "Downloading Completed",
      position: "top",
      autoHide: true,
      onPress: () => Toast.hide(),
    });
  };

  const showToastMessage = () => {
    if (offlineDownload.isDownloadingCompleted) {
      return toastMessage();
    } else {
      return null;
    }
  };
  const downloadItem = async () => {
    if (route.params.videoId.isDownloaded) {
      return null;
    } else {
      const videoMetaData = videoStore.videoPlayList.filter((item) => {
        if (item.videoId === route.params.videoId.videoId) {
          return item;
        }
      });
      if (offlineDownload.isVideoDownloading) {
        offlineDownload.cancelCurrentDownloadingTask(videoMetaData[0].videoId);
      } else {
        offlineDownload.downloadVideo(videoMetaData[0]);
      }
    }
  };

  return (
    <View style={{ height: height }}>
      <AppHeader />
      <View style={{ marginHorizontal: 8, marginTop: 8 }}>
        <RNVideo
          videoId={route.params.videoId.videoId}
          height={videoPlayerStore.isPlaying ? 260 : 180}
          play={videoPlayerStore.isPlaying}
          initialPlayerParams={{ rel: false }}
        />
      </View>

      <View
        style={{
          justifyContent: "space-between",
          paddingVertical: 8,
          flexDirection: "row",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => downloadItem()}
          style={{ alignItems: "center" }}
        >
          <DownloadingIndicator
            isDownloading={offlineDownload.isVideoDownloading}
          />

          <Text style={{ fontSize: 14, fontWeight: "500" }}>
            {offlineDownload.isVideoDownloading
              ? "Downloading"
              : route.params.videoId.isDownloaded
              ? "Downloaded"
              : "Download"}
          </Text>
        </TouchableOpacity>

        <View style={{ width: "70%" }}>
          <DropDown />
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <FlatList
          data={videoStore.similarVideos}
          keyExtractor={(item) => item.videoId}
          renderItem={({ item }) => renderSimilarVideo(item)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{ paddingBottom: "90%" }} />}
        />
      </View>

      {showToastMessage()}
    </View>
  );
};

export default inject("rootStore")(observer(VideoDetails));

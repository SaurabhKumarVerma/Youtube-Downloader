import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { PropsWithChildren, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { PropsWithStore } from "../../store/RootStore";
import {
  IDownloadedVideo,
  IVideoInfo,
} from "../../types/interface/youtubeList.interface";
import RenderVideoList from "./RenderVideoList";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../navigation/ScreenName/Screen";
import { RootStackParamList } from "../../types/react-navigation";
import Header from "./Header";

const VideoList = (props: PropsWithStore<PropsWithChildren>) => {
  const { videoStore } = props.rootStore;
  const { navigate } = useNavigation<RootStackParamList>();

  useEffect(() => {
    videoStore.resetSimilarVideoList();

    let timeout = setTimeout(() => {
      // videoStore.downloadAllItemsInBatches(1);
    }, 9000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const navigateToVideoDetails = (item: IDownloadedVideo) => {
    navigate(ScreenName.VIDEO_DETAILS, {
      videoId: item,
    });
  };

  const renderVideo = (item: IVideoInfo) => {
    return (
      <TouchableOpacity
        style={{ marginBottom: 12 }}
        onPress={() => navigateToVideoDetails(item as IDownloadedVideo)}
      >
        <RenderVideoList
          videoThumbnail={item.thumbnail_Link}
          videoTitle={item.video_Title}
        />
      </TouchableOpacity>
    );
  };
  ``;

  const loadingStatus = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        <Header />
      </View>
      <View>
        {videoStore.isLoadingVideo ? (
          loadingStatus()
        ) : (
          <>
            <FlatList
              data={videoStore.videoPlayList}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => renderVideo(item)}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default inject("rootStore")(observer(VideoList));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
});

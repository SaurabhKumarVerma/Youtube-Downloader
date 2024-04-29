import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenName } from "../navigation/ScreenName/Screen";
import { IDownloadedVideo } from "./interface/youtubeList.interface";

// Define the RootStackParamList type that contains the list of screens and their corresponding parameters

export type RootStackParamList = {
  [ScreenName.INITIAL_SCREEN]: undefined;
  [ScreenName.HOME]: undefined;
  [ScreenName.VIDEO_DETAILS]: { videoId: IDownloadedVideo };
  [ScreenName.DOWNLOAD_SCREEN]: undefined;
  [ScreenName.OFFLINE_VIDEO_PLAYBACK_SCREEN]: {
    videoMetaData: IDownloadedVideo;
  };
};

// Define the ScreenProps type that contains the props for each screen in the application

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Define the VideoDetailsScreenRouteProp type that contains the route prop for the VideoDetails screen

export type VideoDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  ScreenName.VIDEO_DETAILS
>;

// Define the OfflineVideoScreenProps type that contains the props for the OfflineVideoPlayback screen

export type OfflineVideoScreenProps = RouteProp<
  RootStackParamList,
  ScreenName.OFFLINE_VIDEO_PLAYBACK_SCREEN
>;

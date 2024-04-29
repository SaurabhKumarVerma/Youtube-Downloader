import { PLAYER_STATES } from "react-native-youtube-iframe";

export interface IVideoId {
  id: string;
  videoId: string;
}

export interface IVideoInfo extends IVideoId {
  thumbnail_Link: string;
  video_Title: string;
}

export interface IDownloadedVideo extends IVideoInfo {
  isDownloaded: boolean;
  path?: string;
}

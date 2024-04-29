/**
 * Store class for managing video-related state and actions.
 */

import { action, makeAutoObservable, observable } from "mobx";
import RootStore from "../RootStore";
import {
  IDownloadedVideo,
  IVideoInfo,
} from "../../types/interface/youtubeList.interface";
import youtubeListVideo from "../../data";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import _ from "lodash";
import ReactNativeBlobUtil, {
  FetchBlobResponse,
  StatefulPromise,
} from "react-native-blob-util";
import ytdl from "react-native-ytdl";
export class VideoStore {
  rootStore: typeof RootStore;

  @observable videoPlayList: IVideoInfo[] = undefined;
  @observable isLoadingVideo: boolean = false;
  @observable similarVideos: IVideoInfo[] = undefined;
  @observable autoDownloadConfig: StatefulPromise<FetchBlobResponse>;
  @observable updatedPlayList: IDownloadedVideo[] = undefined;
  @observable batchSize: number = 2; // Auto Download Per Batch
  @observable isInitialized = false;

  /**
   * Constructs a new instance of VideoStore.
   * @param {typeof RootStore} rootStore - The root store instance.
   */

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  /**
   * Sets the updated video playlist.
   * @param {IDownloadedVideo[]} list - The updated video playlist.
   */

  @action
  getUpdatePlayList(list: IDownloadedVideo[]) {
    this.videoPlayList = list;
  }

  /**
   * Sets the loading status for videos.
   * @param {boolean} status - The loading status.
   */

  @action
  checkVideoIsLoading(status: boolean) {
    this.isLoadingVideo = status;
  }

  /**
   * Updates the video list with downloaded item information.
   * @param {IDownloadedVideo} downLoadedItemList - Downloaded item information.
   */

  @action
  updatedVideoList(downLoadedItemList: IDownloadedVideo) {
    // Merges downloaded item information with existing video list
    const mergedArray = _.map(downLoadedItemList, (obj) => {
      const correspondingObject = _.find(
        this.rootStore.offlineDownload.metaData,
        { videoId: obj.videoId }
      );
      if (correspondingObject) {
        return _.assign({}, obj, { isDownloaded: true });
      } else {
        return _.assign({}, obj, { isDownloaded: false });
      }
    });
    this.updatedPlayList = mergedArray;
    this.getUpdatePlayList(mergedArray);
  }

  /**
   * Updates the current video list by fetching video titles and thumbnail links.
   */

  @action
  async updateCurrentVideoList() {
    this.checkVideoIsLoading(true);
    let videoPlayList = await Promise.all<IVideoInfo>(
      youtubeListVideo.map(async (item, index) => {
        let video_Title = await this.getVideoTitle(item.videoId);
        let thumbnail_Link = await this.getVideoThumbnailLink(item.videoId);
        return { ...item, video_Title, thumbnail_Link };
      })
    );

    this.updatedVideoList(videoPlayList as IVideoInfo);
    this.checkVideoIsLoading(false);
  }

  /**
   * Fetches the title of a video.
   * @param {string} id - The video ID.
   * @returns {Promise<string | null>} A promise that resolves to the video title or null if an error occurs.
   */

  @action
  async getVideoTitle(id: string) {
    try {
      let metaData = await getYoutubeMeta(id);
      return metaData.title;
    } catch (error) {
      return null;
    }
  }

  /**
   * Fetches the thumbnail link of a video.
   * @param {string} id - The video ID.
   * @returns {Promise<string | null>} A promise that resolves to the thumbnail link or null if an error occurs.
   */

  @action
  async getVideoThumbnailLink(id: string) {
    try {
      let metaData = await getYoutubeMeta(id);
      return metaData.thumbnail_url;
    } catch (error) {
      return null;
    }
  }

  /**
   * Retrieves similar videos based on a given video ID.
   * @param {string} id - The ID of the video.
   */

  @action
  getSimilarVideo(id: string) {
    let data = this.videoPlayList;
    const updatedSimilarList = _.filter(
      data,
      (videos: IVideoInfo) => (videos.videoId || videos.videoId.videoId) !== id
    );

    const mergedArray = _.map(updatedSimilarList, (obj) => {
      const correspondingObject = _.find(
        this.rootStore.offlineDownload.metaData,
        { videoId: obj.videoId }
      );
      if (correspondingObject) {
        return correspondingObject;
      } else {
        return _.assign({}, obj, { isDownloaded: true });
      }
    });
    this.similarVideos = updatedSimilarList;
  }

  /**
   * Resets the list of similar videos.
   */

  @action
  resetSimilarVideoList() {
    this.similarVideos = undefined;
  }

  /**
   * Initiates auto download for a given video.
   * @param {IVideoInfo} item - The video information.
   * @returns {Promise<StatefulPromise<FetchBlobResponse>>} The auto download configuration.
   */

  @action
  async initiateAutoDownload(item: IVideoInfo) {
    let urls = await ytdl(item.videoId);

    const fileName = `${item.videoId}`;
    const fileDir = ReactNativeBlobUtil.fs.dirs.DownloadDir;
    const filePath = `${fileDir}/${fileName}.mp4`;

    const configOption = {
      fileCache: true,
      path: filePath,
      appendExt: ".mp4",
      addAndroidDownloads: {
        notification: true,
        mediaScannable: true,
        useDownloadManager: true,
        title: `${item.video_Title}`,
        path: filePath,
        description: `${item.video_Title}`,
      },
    };

    this.autoDownloadConfig = ReactNativeBlobUtil.config(configOption).fetch(
      "GET",
      urls[0].url
    ) as StatefulPromise<FetchBlobResponse>;
    return this.autoDownloadConfig;
  }

  /**
   * Retrieves the updated list of videos for downloading.
   * @returns {Promise<IDownloadedVideo[]>} The updated list of videos.
   */
  @action
  async getUpdatedList() {
    let combinedArray = [];
    const checkItemDownloaded =
      await this.rootStore.offlineDownload.readMetaDataFile();

    this.videoPlayList.forEach((obj1) => {
      if (!checkItemDownloaded.some((obj2) => obj2.videoId === obj1.videoId)) {
        combinedArray.push(obj1);
      }
    });

    checkItemDownloaded.forEach((obj2) => {
      if (!this.updatedPlayList.some((obj1) => obj1.videoId === obj2.id)) {
        combinedArray.push(obj2);
      }
    });

    return combinedArray;
  }

  /**
   * Downloads a batch of videos.
   * @param {number} startIndex - The start index of the batch.
   * @param {number} batchSize - The size of the batch.
   * @returns {Promise<FetchBlobResponse>} The download response.
   */

  @action
  async downloadBatch(
    startIndex: number,
    batchSize: number
  ): Promise<FetchBlobResponse> {
    let newArray = await this.getUpdatedList();
    const batch = newArray.slice(startIndex, startIndex + batchSize);
    const downloadPromises = batch.map((item) =>
      this.initiateAutoDownload(item)
    );
    return Promise.all(downloadPromises);
  }

  /**
   * Downloads all items in batches.
   * @param {number} batchSize - The size of each batch.
   */

  @action
  async downloadAllItemsInBatches(batchSize) {
    for (let i = 0; i < this.updatedPlayList.length; i += batchSize) {
      await this.downloadBatch(i, batchSize)
        .then((response) => {
          this.rootStore.offlineDownload.storeMetaData(
            this.updatedPlayList[i],
            response.data
          );
        })
        .catch((error) => {
          console.log("error while auto download", error);
        });
    }
  }
}

/**
 * OfflineVideoStore class handles the downloading and management of offline videos in a React Native application.
 * It uses the react-native-blob-util library to download and manage the video files, and the react-native-ytdl library
 * to extract video information from YouTube URLs.
 */

import { action, makeObservable, observable } from "mobx";
import RootStore from "../RootStore";
import ReactNativeBlobUtil, {
  FetchBlobResponse,
  StatefulPromise,
} from "react-native-blob-util";
import ytdl from "react-native-ytdl";
import {
  IDownloadedVideo,
  IVideoInfo,
} from "../../types/interface/youtubeList.interface";
import _ from "lodash";
import { EVIDEOQUALITY } from "../../types/VideoQuality.interface";
import { Alert, PermissionsAndroid } from "react-native";
export class OfflineVideoStore {
  rootStore: typeof RootStore;
  @observable isVideoDownloading: boolean = false;
  @observable isDownloadingCompleted: boolean = false;

  /**
   * Constructor for the OfflineVideoStore class.
   * @param rootStore - A reference to the root store of the application.
   */

  constructor(rootStore: typeof RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @observable cancelDownloading: StatefulPromise<FetchBlobResponse>;
  @observable filePath;
  @observable metaData: IDownloadedVideo[] = [];
  @observable downloadedVideo = [];
  @observable videoQuality: string = undefined;

  /**
   * Sets the isVideoDownloading property to the given status.
   * @param status - A boolean indicating whether a video is currently being downloaded.
   */

  @action
  setDownloading(status: boolean) {
    this.isVideoDownloading = status;
  }

  /**
   * Sets the filePath property to the given path.
   * @param path - A string representing the file path of the currently downloading video.
   */

  @action
  setFilePath(path: string) {
    this.filePath = path;
  }

  /**
   * Checks if the given storage path exists.
   * @param storagepath - A string representing the storage path to check.
   * @returns A boolean indicating whether the storage path exists.
   */

  @action
  checkPathExists(storagepath: string) {
    return ReactNativeBlobUtil.fs.exists(storagepath);
  }

  /**
   * Creates a new directory for storing the downloaded videos.
   * @returns A promise that resolves when the directory is created.
   */

  @action
  createNewDir() {
    const fileDir = ReactNativeBlobUtil.fs.dirs.DownloadDir + "/YtVideo";
    return ReactNativeBlobUtil.fs.mkdir(fileDir);
  }

  /**
   * Adds the given IDownloadedVideo object to the metaData array.
   * @param data - An IDownloadedVideo object representing the metadata of a downloaded video.
   */

  @action
  updateMetaData(data: IDownloadedVideo) {
    if (data) {
      this.metaData.push(data);
    }
  }

  /**
   * Creates a new metaData.json file in the document directory.
   * @param item - An IDownloadedVideo object representing the metadata of a downloaded video.
   * @param source - A string representing the source of the downloaded video.
   */

  @action
  createVideoMetaData(item, source) {
    this.updateMetaData(item);
    const path = ReactNativeBlobUtil.fs.dirs.DocumentDir + "/meta.json";
    const initialData = [{ ...item, isDownloaded: true, path: source }];
    ReactNativeBlobUtil.fs.writeFile(path, JSON.stringify(initialData), "utf8");
    console.log("File is Created");
  }

  /**
   * Reads the metaData.json file from the document directory and returns its contents as a JavaScript object.
   * @returns A promise that resolves with the contents of the metaData.json file as a JavaScript object.
   */

  @action
  async readMetaDataFile() {
    const path = ReactNativeBlobUtil.fs.dirs.DocumentDir + "/meta.json";
    const data = await ReactNativeBlobUtil.fs.readFile(path, "utf8");
    return JSON.parse(data);
  }

  /**
   * Writes the given IVideoInfo object to the metaData.json file.
   * @param newData - An IVideoInfo object representing the metadata of a downloaded video.
   * @param source - A string representing the source of the downloaded video.
   */

  @action
  async writeMetaDataToFile(newData: IVideoInfo, source) {
    let updated = await this.readMetaDataFile();
    const videoMetaDataExist = _.some(updated, {
      videoId: newData.videoId,
    });
    if (!videoMetaDataExist) {
      newData.isDownloaded = true;
      newData.path = source;
      this.updateMetaData(newData);
      const path = ReactNativeBlobUtil.fs.dirs.DocumentDir + "/meta.json";
      ReactNativeBlobUtil.fs.writeFile(
        path,
        JSON.stringify(this.metaData),
        "utf8"
      );
    }

    console.log("File is Written");
  }

  /**
   * Checks if the metadata file exists in the document directory.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the metadata file exists.
   */

  @action
  checkMetaDataFileExist() {
    return ReactNativeBlobUtil.fs.exists(
      ReactNativeBlobUtil.fs.dirs.DocumentDir + "/meta.json"
    );
  }

  /**
   * Stores metadata for a video item at the specified path.
   * If the metadata file does not exist, it creates a new one and adds metadata.
   * If the metadata file exists, it updates the existing metadata.
   * @param {object} item - The video item metadata to store.
   * @param {string} path - The path where the metadata should be stored.
   * @returns {Promise<void>} A promise that resolves once the metadata is stored.
   */

  @action
  async storeMetaData(item, path) {
    const exist = await this.checkMetaDataFileExist();
    if (!exist) {
      this.createVideoMetaData(item, path);
    } else {
      this.writeMetaDataToFile(item, path);
    }
  }

  /**
   * Retrieves cached data from the metadata file and updates the metadata array.
   * @returns {Promise<void>} A promise that resolves once the cached data is retrieved and processed.
   */

  @action
  async getCachedData() {
    let updated = await this.readMetaDataFile();
    if (_.isEmpty(updated)) {
      return;
    } else {
      // Iterate through the updated metadata and add each item to the metadata array

      _.uniqBy(
        _.forEach(updated, (item) => {
          const {
            id,
            isDownloaded,
            path,
            thumbnail_Link,
            videoId,
            video_Title,
          } = item;
          this.metaData.push({
            id,
            isDownloaded,
            path,
            thumbnail_Link,
            videoId,
            video_Title,
          });
        }),
        "videoId"
      );
    }
  }

  /**
   * Downloads the video file associated with the provided video info.
   * @param {IVideoInfo} item - The video information containing the video ID.
   * @returns {StatefulPromise<FetchBlobResponse>} A promise representing the ongoing download process.
   */

  @action
  async downloadVideoFile(item: IVideoInfo) {
    const youtubeURL = `https://www.youtube.com/watch?v=${item.videoId}`;
    const urls = await ytdl(youtubeURL, {
      quality: this.videoQuality || EVIDEOQUALITY.HIGHEST,
    });
    const fileName = `${item.videoId}`;
    const fileDir = ReactNativeBlobUtil.fs.dirs.DownloadDir;
    const filePath = `${fileDir}/${fileName}.mp4`;

    this.setFilePath(filePath);
    const configOption = {
      fileCache: true,
      path: filePath,
      appendExt: ".mp4",
      addAndroidDownloads: {
        notification: this.isVideoDownloading,
        mediaScannable: true,
        useDownloadManager: true,
        title: `${item.video_Title}`,
        path: filePath,
        description: `${item.video_Title}`,
      },
    };
    this.cancelDownloading = ReactNativeBlobUtil.config(configOption).fetch(
      "GET",
      urls[0].url
    ) as StatefulPromise<FetchBlobResponse>;
    return this.cancelDownloading;
  }

  /**
   * Initiates the download process for the video associated with the provided video info.
   * @param {IVideoInfo} item - The video information containing the video ID.
   * @returns {Promise<void>} A promise that resolves once the download process is completed.
   */
  @action
  async downloadVideo(item: IVideoInfo) {
    this.setDownloading(true);
    this.isDownloadingCompleted = false;
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );
    if (result === "granted") {
      this.downloadVideoFile(item)
        .then((res) => {
          console.log("res", res);

          this.storeMetaData(item, res.data);
          this.setDownloading(false);
          this.isDownloadingCompleted = true;
          this.getCachedData();
        })
        .catch((error) => {
          this.setDownloading(false);
          console.log("error", error);
        });
    } else {
      Alert.alert("Permission Denied");
    }
  }

  /**
   * Cancels the current downloading task and cleans up any associated resources.
   * @param {string} item - The identifier of the item being downloaded.
   * @returns {Promise<void>} A promise that resolves once the downloading task is canceled.
   */

  @action
  async cancelCurrentDownloadingTask(item: string) {
    this.setDownloading(false);
    try {
      // Check if the file exists before attempting to cancel and delete it
      let isExist = ReactNativeBlobUtil.fs.exists(this.filePath);
      // Cancel the ongoing download task
      this.cancelDownloading.cancel((reason) => {
        // Remove the downloaded file
        ReactNativeBlobUtil.fs
          .unlink(this.filePath)
          .then(() => {})
          .catch((err) => {
            console.log(
              `Error removing cached data for ${this.filePath}:`,
              err
            );
          });
      });
    } catch (error) {
      console.log("Error", error);
    }
  }

  /**
   * Sets the selected video quality for downloading.
   * @param {string} quality - The selected video quality.
   */

  @action
  selectVideoQuality(quality: string) {
    this.videoQuality = quality;
  }
}

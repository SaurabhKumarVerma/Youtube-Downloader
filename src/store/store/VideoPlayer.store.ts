import { action, makeObservable, observable } from "mobx";
import RootStore from "../RootStore";
import { PLAYER_STATES } from "react-native-youtube-iframe";
import ReactNativeBlobUtil from "react-native-blob-util";

export class VideoPlayerStore {
  rootStore: typeof RootStore;
  @observable isPlaying: boolean = false;
  @observable playerState: PLAYER_STATES | "loading" = PLAYER_STATES.UNSTARTED;
  constructor(rootStore: typeof RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @action
  setIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying;
  }

  @action
  checkVideoIsPlayingState(state: PLAYER_STATES) {
    this.playerState = state;
  }

  @action
  async readMetaDataFile() {
    const path = ReactNativeBlobUtil.fs.dirs.DocumentDir + "/meta.json";
    const data = await ReactNativeBlobUtil.fs.readFile(path, "utf8");
    return JSON.parse(data);
  }
  @action
  getLocalVideos() {
    this.readMetaDataFile();
    const fileDir = ReactNativeBlobUtil.fs.dirs.DocumentDir;
    ReactNativeBlobUtil.fs
      .ls(fileDir)
      .then((files) => {
        console.log("Files in Download directory:", files);
        return files;
      })
      .catch((err) => console.error("Error while listing files:", err));
  }
}

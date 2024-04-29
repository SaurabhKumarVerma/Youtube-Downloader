import { CacheStore } from "./store/CacheVideoStore.store";
import { NetworkStore } from "./store/Network.store";
import { OfflineVideoStore } from "./store/OfflineVideo.store";
import { VideoStore } from "./store/VideoData.store";
import { VideoPlayerStore } from "./store/VideoPlayer.store";

// Type definition for a component with a RootStore property

export type PropsWithStore<T> = T & {
  rootStore?: RootStore;
};

// RootStore class to manage and provide access to various stores

class RootStore {
  networkStore: NetworkStore;
  videoStore: VideoStore;
  stores: any[];
  videoPlayerStore: VideoPlayerStore;
  offlineDownload: OfflineVideoStore;
  cacheStore: CacheStore;

  // Constructor to initialize all stores

  constructor() {
    this.networkStore = new NetworkStore(this);
    this.videoStore = new VideoStore(this);
    this.videoPlayerStore = new VideoPlayerStore(this);
    this.offlineDownload = new OfflineVideoStore(this);
    this.cacheStore = new CacheStore(this);
    this.stores = [
      this.networkStore,
      this.videoStore,
      this.videoPlayerStore,
      this.offlineDownload,
      this.cacheStore,
    ];
  }
}

// Exporting a new instance of RootStore
export default new RootStore();

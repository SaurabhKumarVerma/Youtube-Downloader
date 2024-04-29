import { action, makeAutoObservable, observable } from "mobx";
import RootStore from "../RootStore";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

/**
 * NetworkStore class to manage network connectivity status.
 * @class NetworkStore
 */

export class NetworkStore {
  /**
   * Instance of the RootStore.
   * @member {typeof RootStore} rootStore
   */

  rootStore: typeof RootStore;

  /**
   * Indicates whether the device is connected to the network or not.
   * @member {boolean | null} isConnected
   */

  @observable isConnected: boolean | null = null;

  /**
   * Initializes the NetworkStore instance.
   * @param {typeof RootStore} rootStore - Instance of the RootStore.
   */

  constructor(rootStore: typeof RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;

    /**
     * Adds an event listener to monitor network connectivity changes.
     * @listens NetInfo#event:change
     */

    NetInfo.addEventListener((state: NetInfoState) => {
      this.checkNetworkStatus(state.isConnected);
    });
  }

  /**
   * Updates the network connectivity status.
   * @param {boolean | null} isNetworkConnected - Indicates whether the device is connected to the network or not.
   */

  @action
  checkNetworkStatus(isNetworkConnected: boolean | null) {
    this.isConnected = isNetworkConnected;
  }
}

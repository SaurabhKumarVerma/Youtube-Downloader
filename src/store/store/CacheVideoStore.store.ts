import { makeObservable } from "mobx";
import RootStore from "../RootStore";
export class CacheStore {
  rootStore: typeof RootStore;

  constructor(rootStore: typeof RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }
}

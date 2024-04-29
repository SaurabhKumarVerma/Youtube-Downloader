import { saveData, getData, removeData } from "./Storage";

class ECommerceAsyncStore {
  async saveVideo(key: string, data: any) {
    try {
      await saveData(key, data);
    } catch (e) {
      console.error("Error on saving user access data");
    }
  }

  async getAccessData(key: string) {
    let saveData;
    try {
      saveData = await getData(key);
      return saveData ? JSON.parse(saveData) : null;
    } catch (e) {
      console.error("Error on getting user data");
    }

    return saveData;
  }

  async removeUserData(key: string) {
    try {
      console.log("Clear user data ......");
      await removeData(key);
    } catch (e) {
      console.error("Error on removing user data");
    }
  }
}

export default new ECommerceAsyncStore();

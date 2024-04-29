import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.log("PutStorageClientFailed");
  }
};

export const getData = async (key: string) => {
  try {
    await AsyncStorage.getItem(key);
  } catch (e) {
    console.log("Failed to get data");
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log("Failed to delete data");
  }
};

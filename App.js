import { SafeAreaView, StyleSheet } from "react-native";
import NoInternet from "./src/Base/NoInternet/NoInternet";
import Navigator from "./src/app";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
      <NoInternet />
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

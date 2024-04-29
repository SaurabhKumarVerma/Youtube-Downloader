import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { AutoImage } from "../../Base/AutoImage/AutoImage";
import { useNavigation } from "@react-navigation/native";
import { ScreenName } from "../../navigation/ScreenName/Screen";
import { RootStackParamList } from "../../types/react-navigation";
import { inject, observer } from "mobx-react";
import { PropsWithStore } from "../../store/RootStore";
import { images } from "../../../assets";

interface ISimilarVideoList {
  thumbnail: string;
  videoTitle: string;
  videoId: string;
}

const SimilarVideoList = (
  props: PropsWithStore<PropsWithChildren<ISimilarVideoList>>
) => {
  const { networkStore } = props.rootStore;
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width: width - 50 }]}>
      <View>
        <AutoImage
          source={
            networkStore.isConnected
              ? { uri: props.thumbnail }
              : images.defaultVideoImage
          }
          maxHeight={50}
          maxWidth={80}
          style={{ borderRadius: 4, width: 80, height: 50 }}
        />
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <Text numberOfLines={2}>{props.videoTitle}</Text>
      </View>
    </View>
  );
};

export default inject("rootStore")(observer(SimilarVideoList));

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    flex: 1,
  },
});

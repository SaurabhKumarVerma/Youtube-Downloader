import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { data } from "./dropdownData";
import { Dropdown } from "react-native-element-dropdown";
import { PropsWithStore } from "../../store/RootStore";
import { inject, observer } from "mobx-react";
import { EVIDEOQUALITY } from "../../types/VideoQuality.interface";
const DropDown = (props: PropsWithStore<PropsWithChildren>) => {
  const [value, setValue] = useState(EVIDEOQUALITY.HIGHEST_VIDEO);
  const [isFocus, setIsFocus] = useState(false);
  const { offlineDownload } = props.rootStore;

  useEffect(() => {
    offlineDownload.selectVideoQuality(EVIDEOQUALITY.HIGHEST);
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="type"
          valueField="quality"
          placeholder={!isFocus ? "Select Video Quality" : "..."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          showsVerticalScrollIndicator={false}
          onChange={(item) => {
            setValue(item.quality);
            offlineDownload.selectVideoQuality(item.quality);
            setIsFocus(false);
          }}
          renderRightIcon={() => (
            <Ionicons
              style={styles.icon}
              color={isFocus ? "blue" : "black"}
              name="caret-down-circle"
              size={20}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default inject("rootStore")(observer(DropDown));

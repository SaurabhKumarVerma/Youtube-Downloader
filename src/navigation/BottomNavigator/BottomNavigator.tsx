import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import StackNavigator from "../StackNavigator/StackNavigator";
import { ScreenName } from "../ScreenName/Screen";
import DownloadedVideoScreen from "../../Screen/DownloadedVideoScreen/DownloadedVideoScreen";
import CustomBottomTabBar from "./CustomBottomTabBar";
import OfflineStackNavigator from "../StackNavigator/OfflineVideoStackNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

/**
 * The BottomNavigation component is a custom bottom navigation bar that renders three tabs:
 * Home, Learn, and Market.
 *
 * This component uses the `createBottomTabNavigator` function from the `@react-navigation/bottom-tabs`
 * package to create the tab navigation bar. The `CustomBottomTabBar` component is used as the
 * `tabBar` prop, which renders a custom tab bar with the appropriate icons.
 *
 * The `BottomNavigator` component also utilizes the `useNavigation` hook from the `@react-navigation/native`
 * package to access the navigation stack and pass the `navigation` object to the `CustomBottomTabBar` component.
 */

const CustomBottomTabs = (props: BottomTabBarProps) => {
  return <CustomBottomTabBar {...props} />;
};

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={ScreenName.HOME}
      tabBar={CustomBottomTabs}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={ScreenName.HOME} component={StackNavigator} />
      <Tab.Screen
        name={ScreenName.ROOT_DOWNLOAD}
        component={OfflineStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

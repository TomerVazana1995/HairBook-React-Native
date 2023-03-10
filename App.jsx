import "react-native-gesture-handler";
import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/components/AppNavigator";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import * as theme from "./src/config/theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
         <React.Fragment>
      <NativeBaseProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <AppNavigator />
        </ApplicationProvider>
      </NativeBaseProvider>
    </React.Fragment>
    </SafeAreaProvider>
 
  );
}


import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import AppNavigator from './src/components/AppNavigator';


export default function App() {
  return (
    <NativeBaseProvider>
      <AppNavigator/>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

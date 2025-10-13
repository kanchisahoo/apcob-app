import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Router from './routers/Router';
import { log, crash, recordError, setUserId, setAttribute, getCrashlytics } from '@react-native-firebase/crashlytics';


const App = () => {
  //  const crashlytics = getCrashlytics(); 
  //   useEffect(() => {
  //   // Set user info
  //   setUserId(crashlytics, 'user_12345');
  //   setAttribute(crashlytics, 'role', 'tester');
  //   log(crashlytics, 'App started');
  // }, []);

  // const handleForceCrash = () => {
  //   log(crashlytics, 'Force crash button pressed');
  //   crash(crashlytics); // 🚨 Force crash
  // };

  // const handleNonFatalError = () => {
  //   try {
  //     throw new Error('Simulated non-fatal error');
  //   } catch (err:any) {
  //     log(crashlytics, 'Non-fatal error button pressed');
  //     recordError(crashlytics, err); // ✅ Log error
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <Router />
        {/* <View style={styles.container}>
      <Text style={styles.title}>Crashlytics Test</Text>

      <Button title="Force Crash 🚨" onPress={handleForceCrash} />

      <View style={{ marginTop: 20 }} />
      <Button title="Log Non-Fatal Error ⚠️" onPress={handleNonFatalError} />
    </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
});

export default App;

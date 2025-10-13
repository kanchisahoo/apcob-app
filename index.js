import 'react-native-get-random-values';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  ActivityIndicator,
  Alert,
  AppRegistry,
  AppState,
  Text,
  View
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';

import { useEffect, useRef, useState } from 'react';
import { name as appName } from './app.json';
import { store } from './redux/store';

export default function Main() {
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apkUrl, setApkUrl] = useState('');
  const [latestVersion, setLatestVersion] = useState('');
  const [isOutdated, setIsOutdated] = useState(false);
  const appState = useRef(AppState.currentState);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0); // from 0 to 1

  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();
  const packageName = DeviceInfo.getBundleId();

  const isVersionOutdated = (current, latest) => {
    const currentParts = current?.split('.').map(Number) || [];
    const latestParts = latest?.split('.').map(Number) || [];

    for (
      let i = 0;
      i < Math.max(currentParts.length, latestParts.length);
      i++
    ) {
      const a = currentParts[i] || 0;
      const b = latestParts[i] || 0;
      if (a < b) return true;
      if (a > b) return false;
    }
    return false;
  };

  useEffect(() => {
    const handleAppStateChange = async nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        isOutdated
      ) {
        const granted = await PermissionModule?.isUnknownSourcesAllowed?.();
        console.log('Permission granted:', granted);

        if (granted === true || granted === 'true') {
          setTimeout(() => {
            Alert.alert(
              'Ready to Download',
              'You granted the permission. Tap below to download the update.',
              [
                {
                  text: 'Download',
                  onPress: downloadApk,
                },
              ],
            );
          }, 500);
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, [isOutdated, apkUrl]);
//   useEffect(()=>{
//  const handleGlobalError = (error, navigation) => {
//   console.log('Global Error:', error);

//   // Example: If token is expired or response malformed
//   if (
//     error?.message?.includes('Token expired') ||
//     error?.message?.includes('Invalid token') ||
//     error?.message?.includes('Unexpected end of JSON input') || 
//     error?.message?.includes('Maximum Device Reached. Please try again later')||
//     typeof error === 'undefined'
//   ) {
//     // Dispatch logout and reset navigation
//    actions.logout({});
//       //  clearLoginCredentialAuth();
//        navigation.navigate(navigationString.HOME.LOGIN );  // your logout action clears redux + asyncStorage

//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{ name: 'Login' }], // change 'Login' to your login route name
//       })
//     );
//   } else {
//     // Optionally show a toast or alert
//     console.error('An error occurred:', error);
//   }
// };
//   },[])
 

  // ✅ Initial version check
  const fetchDownloadUrl = async () => {
    try {
      const response = await axios.post(
        'https://app-distribution-prod.txninfra.com/latestVersion',
        {
          app_package_name: packageName,
          is_enabled: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const latest = response.data.data[0]?.version;
      const url = response?.data?.data[0]?.appurl;
      console.log(response.data.data, 'resultttt');
      const current = DeviceInfo.getVersion();

      console.log('Current version:', current);
      console.log('Latest version:', latest);

      if (current && latest && isVersionOutdated(current, latest)) {
        setIsOutdated(true);
        setApkUrl(url);
        setLatestVersion(latest);
      }
    } catch (err) {
      console.error('API call failed:', err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && isOutdated) {
      Alert.alert(
        'Update Available',
        `A new version (${latestVersion}) is available. Please allow installation from unknown sources.`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'OK',
            onPress: () => {
              PermissionModule.openUnknownAppSourcesSettings();
            },
          },
        ],
      );
    }
  }, [loading, isOutdated]);

  useEffect(() => {
    fetchDownloadUrl();
  }, []);

    const downloadApk = async () => {
    try {
      const fileName = 'app-latest.apk';
      const downloadDir = `${RNFS.DocumentDirectoryPath}/${appName}`; // public download folder
      const localFilePath = `${downloadDir}/${fileName}`;

      const exists = await RNFS.exists(downloadDir);
      if (!exists) {
        await RNFS.mkdir(downloadDir);
      }
      setDownloading(true);
      setProgress(0);

      const options = {
        fromUrl: apkUrl,
        toFile: localFilePath,
        background: true,
        discretionary: true,
        progress: res => {
          const percentage = res.bytesWritten / res.contentLength;
          setProgress(percentage);
        },
        progressDivider: 1,
      };
      const result = await RNFS.downloadFile(options).promise;
      setDownloading(false);
      if (result.statusCode === 200) {
        Alert.alert('Download Complete', 'Installing APK...');
        PermissionModule.installApk(localFilePath);
      } else {
        Alert.alert('Download Failed', `Status: ${result.statusCode}`);
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download APK');
      setDownloading(false);
    }
  };

  const insertAppDataToApiDatabase = async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    const ipAddress = await DeviceInfo.getIpAddress();
    const apiLevel = await DeviceInfo.getApiLevel();
    const deviceModel = DeviceInfo.getModel();
    const insertRequestModel = {
      app_package_name: packageName,
      app_version: version,
      device_id: deviceId,
      device_details: `${deviceModel} / IP - ${ipAddress} / API LEVEL - ${apiLevel}`,
      fcm_token: 'firebase token',
      user_name: 'App User Name',
    };
    console.log(insertRequestModel, 'requestbodydetails');

    try {
      const response = await axios.post(
        'https://app-distribution-prod.txninfra.com/downloadInsertApi',
        insertRequestModel,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response?.data) {
        console.log('App install data sent:', response.data);
      } else {
        console.log('Empty or duplicate data');
      }
    } catch (err) {
      console.error('App install API error:', err);
    }
  };

  const checkAndInsertAppData = async () => {
    try {
      const currentVersion = DeviceInfo.getVersion();
      const lastRecordedVersion = await AsyncStorage.getItem(
        'lastInstalledVersion',
      );

      if (lastRecordedVersion !== currentVersion) {
        console.log('New version detected. Sending app install data...');
        await insertAppDataToApiDatabase(); // 👈 your function here
        await AsyncStorage.setItem('lastInstalledVersion', currentVersion);
      } else {
        console.log('App version unchanged, skipping data insertion.');
      }
    } catch (error) {
      console.error('Version check failed:', error);
    }
  };

  useEffect(() => {
    checkAndInsertAppData();
  }, []);
  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;
  if (error) return <Text style={{color: 'red'}}>{error}</Text>;
  return (
    <StoreProvider store={store}>
       {downloading && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Text style={{color: '#fff', fontSize: 16, marginBottom: 20}}>
            Downloading... {Math.floor(progress * 100)}%
          </Text>
          <View
            style={{
              width: 250,
              height: 20,
              backgroundColor: '#ccc',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <View
              style={{
                width: `${progress * 100}%`,
                height: '100%',
                backgroundColor: '#8B0304',
              }}
            />
          </View>
        </View>
      )}
      <App />
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

// AppRegistry.registerComponent(appName, () => App);

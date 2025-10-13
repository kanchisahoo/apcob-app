import { Alert, Modal, NativeModules, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AadhaarDeclaration = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false)
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => setIsChecked(!isChecked);
    const [authFailed, setAuthFailed] = useState(false);
    const { FindDevice } = NativeModules;
    //     const handleFingerPrintVerification = async () => {
    //     if (!isChecked) return;

    //     // Reset both modals before anything else
    //     setAuthenticationFailed(false);
    //     setVisible(false);
    //     try {
    //       const devicesInfoo: any = await getDeviceInfo();
    //       console.log('Device Info:', devicesInfoo);

    //       if (!devicesInfoo || devicesInfoo.status === -1) {
    //         Alert.alert(devicesInfoo?.message || 'No device detected.');
    //         return;
    //       }

    //       const detectedPackage = devicesInfoo.rdServicePackage;
    //       console.log('Detected Package:', detectedPackage);

    //       // Step 2: Check if RD service is installed and recognized
    //       const matchedDeviceEntry = Object.entries(AVAILABLE_PACKAGES).find(
    //         ([_, pkgName]) => pkgName === detectedPackage,
    //       );

    //       console.log('Using Device:::::::::::--------:', matchedDeviceEntry);
    //       if (!matchedDeviceEntry) {
    //         Alert.alert('Unsupported or unknown RD device connected.');
    //         return;
    //       }

    //       const [deviceType, packageName] = matchedDeviceEntry;
    //       console.log('Using Device:', deviceType, packageName);
    //       const isDriver = await isDriverFound("com.mantra.mfs110.rdservice");

    //       if (!isDriver) {
    //         Alert.alert('Mantra RD Service is not installed or not connected.');
    //         return;
    //       }

    //       // const deviceInfo: any = await getDeviceInfo();
    //       // console.log('Device Info:', deviceInfo);

    //       // if (deviceInfo?.status === -1) {
    //       //   Alert.alert(deviceInfo?.message || 'Device not detected.');
    //       //   return;
    //       // }

    //       const captureResult: any = await openFingerPrintScanner(
    //         "com.mantra.mfs110.rdservice"
    //       );
    //       console.log('Fingerprint Data:', captureResult);
    //       const resp = captureResult?.parsedPidData?.PidData?.Resp;

    //       if (resp) {
    //         console.log('Resp Object:', resp);
    //         console.log('Error Code:', resp['@_errCode']); // Access attribute with the prefix
    //         console.log('Error Info:', resp['@_errInfo']);
    //         console.log('Quality Score:', resp['@_qScore']);
    //         console.log('Iris Count:', resp['@_iCount']);
    //         setQScore(resp['@_qScore'])
    //         // ... access other attributes similarly
    //       }

    //       setFingerprintData(captureResult);

    //       const isCaptureSuccess = captureResult?.status === "SUCCESS";
    //       const isCaptureFail = captureResult?.status === 0 || Number(qScore) < 40;

    //       if (isCaptureSuccess) {
    //         setFailureMessage('');
    //         setAuthenticationFailed(false);
    //         setVisible(true); // Show success modal
    //       } else if (isCaptureFail) {
    //         setFailureMessage('Capture Failed: ' + captureResult?.errInfo);
    //         setVisible(false);
    //         setAuthenticationFailed(true); // Show failure modal
    //       } else {
    //         setFailureMessage('Unknown response from fingerprint scanner.');
    //         setVisible(false);
    //         setAuthenticationFailed(true);
    //       }
    //     } catch(error: any) {
    //       console.log('Capture Error:', error);
    //              setFailureMessage('Something went wrong: ' + error?.message);
    //              setVisible(false);
    //              setAuthenticationFailed(true);
    //     }
    //     };
    //      const handleStartekFingerPrintVerification = async () => {
    //      if (!isChecked) return;

    //      // Reset both modals before anything else
    //      setAuthenticationFailed(false);
    //      setVisible(false);

    //      try {
    //        // const isDriver = await isStartekDriverFound('com.acpl.registersdk_l1');
    //        const isDriver = await isStartekDriverFound('com.acpl.registersdk_l1');
    //        console.log('1234567890-=-0987654321', isDriver);

    //        if (!isDriver) {
    //          Alert.alert('Startek RD Service is not installed or not connected.');
    //          return;
    //        }

    //        const deviceInfoo: any = await getStartekDeviceInfo();
    //        console.log('Device Info:', deviceInfoo);

    //        if (deviceInfoo?.status === -1) {
    //          Alert.alert(deviceInfoo?.message || 'Device not detected.');
    //          return;
    //        }

    //        // const captureResult: any = await openStartekScanner(
    //        //   'com.acpl.registersdk_l1',
    //        // );
    //        const captureResult: any = await openStartekScanner(
    //          'com.acpl.registersdk_l1',
    //        );
    //        console.log('Fingerprint Data:', captureResult);

    //        setFingerprintData(captureResult);
    //        const isCaptureSuccess = captureResult?.status === '1';
    //        const isCaptureFail = captureResult?.status === '0';
    //        const parserOptions = {
    //          ignoreAttributes: false, // Don't ignore attributes
    //          attributeNamePrefix: '@_', // Prefix for attribute names (e.g., @\_errCode)
    //          parseTag: true,
    //          trimValues: true,
    //          textNodeName: '#text', // Name for text content of a node
    //          // More options if needed, but these are key for attributes
    //        };
    //        const parser = new XMLParser(parserOptions);
    //        const parsedData = parser.parse(captureResult?.pidDataXML);

    //        console.log('Parsed PID Data:', JSON.stringify(parsedData, null, 2));

    //        // Now, let's access the Resp data:
    //        const resp = parsedData.PidData.Resp;

    //        if (resp) {
    //          console.log('Resp Object:', resp);
    //          console.log('Error Code:', resp['@_errCode']); // Access attribute with the prefix
    //          console.log('Error Info:', resp['@_errInfo']);
    //          console.log('Quality Score:', resp['@_qScore']);
    //          console.log('Iris Count:', resp['@_iCount']);
    //          setQScore(resp['@_qScore'])
    //          // ... access other attributes similarly
    //        } else {
    //          console.warn('Resp tag not found in parsed data.');
    //        }

    //        // You can also access Data, DeviceInfo, Hmac, Skey
    //        const dataNode = parsedData.PidData.Data;
    //        console.log('Data Type:', dataNode['@_type']); // Access attribute @\_type
    //        console.log('Base64 Encoded Data:', dataNode['#text']); // Access text content using #text

    //        const deviceInfo = parsedData.PidData.DeviceInfo;
    //        console.log('Device ID:', deviceInfo['@_dc']);
    //        console.log('RD Service Package:', deviceInfo['@_dpId']);
    //        console.log('Device Model:', deviceInfo['@_mi']);
    //        console.log(
    //          'Device Type:',
    //          deviceInfo.additional_info.Param[4]['@_value'],
    //        );

    //        if (isCaptureSuccess) {
    //          setFailureMessage('');
    //          setAuthenticationFailed(false);
    //          setVisible(true); // Show success modal
    //        } else if (isCaptureFail) {
    //          setFailureMessage('Capture Failed: ' + captureResult?.errInfo);
    //          setVisible(false);
    //          setAuthenticationFailed(true); // Show failure modal
    //        } else {
    //          setFailureMessage('Unknown response from fingerprint scanner.');
    //          setVisible(false);
    //          setAuthenticationFailed(true);
    //        }
    //      } catch (error: any) {
    //        console.log('Capture Error:', error);
    //        setFailureMessage('Something went wrong: ' + error?.message);
    //        setVisible(false);
    //        setAuthenticationFailed(true);
    //      }
    //    };
    //      async function checkDevice() {
    //         try {
    //           const res = await FindDevice.getConnectedUsbDevice();
    //           console.log('Biometric Device:', res);
    //           // setDeviceInfo(res);
    //           if(res?.productName === 'MFS110') {
    //             handleFingerPrintVerification();
    //           } else if (res?.productName === 'FM220U L1') {
    //             handleStartekFingerPrintVerification();
    //           }
    //           // Output: { driverFlag: 'MANTRA', productName: 'MFS110' }
    //         } catch (err) {
    //           Alert.alert('Error', `${err}`)
    //         }
    //       }
    return (
        <View style={{
            flex: 1,
            padding: "4%",
            backgroundColor: "#FFFFFF"
        }}>

            <Text style={{ fontWeight: "500", fontSize: 16, color: "#262626" }}>Aadhaar Declaration</Text>
            <View style={{ flexDirection: "row", alignItems: "center", width: "95%", marginTop: "5%", justifyContent: "space-evenly" }}>
                <Ionicons name='checkbox' size={20} color="#028A3B" style={{ alignSelf: "flex-start" }}></Ionicons>
                <Text style={{ marginLeft: "3%", color: "#595959" }}>I hereby starte that I have no objection in providing consent for Aadhaar based authentication for the purpose. My biometrics and/ or OTP shall be used only for authenticating my idenetity through the Aadhaar Authentication system for that specific transaction only. Also the security and confidentiality of my personal identity data provided for the purpose of Aadhaar based authentication shall be maintained by Bank.</Text>
            </View>
            <TouchableOpacity style={{ alignSelf: "flex-end", backgroundColor: "#028A3B", alignItems: "center", width: 101, height: 40, borderRadius: 4, justifyContent: "center", marginRight: "5%", marginTop: "4%" }} onPress={() => setVisible(true)}>
                <Text style={{ color: "#FFFFFF" }}>Capture</Text>
            </TouchableOpacity>
            <Modal
                transparent
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>

                        <TouchableOpacity
                            style={{
                                borderWidth: 2,
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                borderColor: '#52C41A',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}>
                            <MaterialIcons
                                name="fingerprint"
                                size={55}
                                color={authFailed ? '#DE1135' : '#52C41A'}></MaterialIcons>
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '400',
                                marginVertical: '5%',
                                textAlign: 'center',
                                color: authFailed ? '#DE1135' : '#52C41A',
                            }}>
                            {' '}
                            {authFailed
                                ? 'Biometric Authentication Failure'
                                : 'Bio authentication successful!'}
                        </Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: "400", color: "#595959" }}>
                            Fingerprint strength: 70%
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.usbButton}>
                                <Text style={styles.usbText}>Recapture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.yesButton} onPress={() => { setVisible(false), navigation.navigate("AepsServices" as never) }}>
                                <Text style={styles.yesText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AadhaarDeclaration

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 309,
        // height: 169,
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 25,
        elevation: 5,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#262626',
    },
    message: {
        fontSize: 14,
        color: '#595959',
        marginVertical: 10,
        fontWeight: "400"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    usbButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginRight: 10,
    },
    usbText: {
        color: '#595959',
        fontWeight: '400',
    },
    yesButton: {
        backgroundColor: '#028A3B', // green
        borderRadius: 4,
        width: 66,
        height: 40,
        justifyContent: "center",
        alignItems: "center"

    },
    yesText: {
        color: '#fff',
        fontWeight: '400',
    },
})
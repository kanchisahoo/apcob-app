import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CarouselComponent from '../Home/components/Carousel'
import Header from '../../utils/HOC/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const DMTUser = () => {
    const [number, setNumber] = useState('');
    const [showActionButtons, setShowActionButtons] = useState(false);
    const [name, setName] = useState('');
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    const [error, setError] = useState({
        number: '',
        name:'',
        aadhaar: '',
        vid: '',
        bank: '',
        amount: '',
    });
    const handleNumberField = (text: string) => {
        let errorMessage = '';


        if (!text) {
            errorMessage = 'Mobile Number is required';
        } else if (!/^\d+$/.test(text)) {
            errorMessage = 'Only numeric values are allowed';
        } else if (!/^[6-9]\d{9}$/.test(text)) {
            errorMessage =
                'Enter a valid 10-digit mobile number starting with 6-9';
        }
        setNumber(text);

        setError(prev => ({ ...prev, number: errorMessage }));
    };
    const handleDone = () => {
        setModalVisible(false);
        setShowActionButtons(true); // 👈 Show refund and transfer buttons
    };
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            {/* <Header /> */}

            <ScrollView
                contentContainerStyle={{ paddingVertical: 0, marginVertical: 0 }}
                showsVerticalScrollIndicator={false}
            >
                <CarouselComponent />
                <View style={{ marginTop: "6%" }}>
                    <Text style={{ color: "#8C8C8C" }}>Fill All The Shop Details </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text: any) => {
                            handleNumberField(text);
                            // if (error.number) setError({ ...error, number: '' });
                        }}
                        value={number || ''}
                        placeholder="Enter Mobile Number"
                        placeholderTextColor={'#909DAD'}
                        keyboardType="number-pad"
                        maxLength={10}
                    />
                    {error.number ? (
                        <Text style={styles.errorText}>{error.number}</Text>
                    ) : null}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text: any) => {
                            handleNumberField(text);
                            // if (error.number) setError({ ...error, number: '' });
                        }}
                        value={name || ''}
                        placeholder="Enter Customer Name"
                        placeholderTextColor={'#909DAD'}
                        maxLength={10}
                    />
                    {error.name ? (
                        <Text style={styles.errorText}>{error.name}</Text>
                    ) : null}
                </View>
                <Text style={{ marginTop: "3%", color: "#1D242D" }}>* Only Alphabets are allowed. Numbers, special characters and trivial names like aaa, cba, or abc are not allowed</Text>
                {!showActionButtons ? (
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => setModalVisible(true)}>
                        <Text style={{ color: '#FFFFFF' }}>Submit</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                    <Text style={{color:"#00000",alignSelf:"flex-end"}}>Change Name</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.usbButton}>
                            <Text style={styles.usbText}>Refund</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transferButton} onPress={() => navigation.navigate("BeneficiaryList" as never)}>
                            <Text style={styles.yesText}>Transfer</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                )}
            </ScrollView>
            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <Image source={require("../../assets/images/LottieFile.png")} style={{ width: "100%", height: 250, resizeMode: "contain", }} />
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ textAlign: "center", color: "#F5222D", fontSize: 16, fontWeight: "500" }}>Number Is Not Found!</Text>
                            <Text style={{ textAlign: "center", color: "#595959", marginTop: "3%", width: "80%" }}>Customer Does Not Exist
                                With Requested Mobile Number </Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.usbButton}>
                                <Text style={styles.usbText}>Recapture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.yesButton} onPress={() => handleDone()}>
                                <Text style={styles.yesText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default DMTUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 16,
    },
    input: {
        height: 45,
        marginTop: 10,
        borderWidth: 0.2,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#ffffff',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        fontSize: 14,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 309,
        height: "65%",
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 20,
        elevation: 5,
        justifyContent: 'space-between',
        // alignItems:"center"
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
        marginTop: 10,
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
        fontSize: 14
    },
    yesButton: {
        backgroundColor: '#F5222D',
        borderRadius: 4,
        paddingHorizontal: 25,
        paddingVertical: 8,
    },
    yesText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 14
    },
    submitButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#028A3B',
        alignItems: 'center',
        width: 101,
        height: 40,
        borderRadius: 4,
        justifyContent: 'center',
        marginRight: '5%',
        marginTop: '4%',
    },
    actionButtonContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginTop: '5%',
        paddingHorizontal: '5%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    refundButton: {
        backgroundColor: '#F5222D',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 4,
    },
    transferButton: {
        backgroundColor: '#028A3B',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 4,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '500',
    },
})
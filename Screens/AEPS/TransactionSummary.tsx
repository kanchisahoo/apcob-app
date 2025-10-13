import React, { useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feather from 'react-native-vector-icons/Feather';

const TransactionSummary = () => {

    const [loading, setLoading] = useState(false);

    return (
        <>
            {loading ? (
                <Modal transparent={true} visible={loading} animationType="fade">
                    <View style={styles.loaderContainer}>
                        <View style={styles.loaderView}>
                            <ActivityIndicator size="large" color="#000" />
                            <Text style={styles.loaderText}>Loging Out...</Text>
                        </View>
                    </View>
                </Modal>
            ) : (

                <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, alignItems: "center" }}>
                    {/* <ImageBackground source={imagePath.background} resizeMode="cover" style={styles.image}> */}
                    <ScrollView style={{ flex: 1 }}
                        contentContainerStyle={{ paddingBottom: 30 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "50%" }}>
                                <Ionicons name="checkmark-circle-outline" size={34} color={"#52C41A"} />
                                <Text style={styles.status}>Aadhaar Declaration</Text>
                            </View>
                            <View>
                                <Text style={styles.amount}>₹ 1500.00</Text>
                            </View>
                        </View>
                        <View style={{ width: "94%", borderWidth: 0.3, borderColor: "#546881", alignItems: "center", marginTop: "5%", alignSelf: "center" }}>

                            <View style={styles.rowContainer}>
                                <Text style={{ color: "#546881", marginBottom: "5%" }}>Transaction ID :</Text>
                               <Text style={styles.valueText}>#57386294267748390</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={{ color: "#546881", marginBottom: "5%" }}>Created Date/ Time :</Text>
                               <Text style={styles.valueText}>10/05/2024, 12:34AM</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={{ color: "#546881", marginBottom: "5%" }}>Updated Date/ Time :</Text>
                               <Text style={styles.valueText}>10/05/2024, 12:34AM</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={{ color: "#546881", marginBottom: "5%" }}>Transaction Type :</Text>
                               <Text style={styles.valueText}>AEPS_CASH_DEPOSIT</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text
                                    style={{ color: "#546881", marginBottom: "5%" }}>Amount :</Text>
                               <Text style={styles.valueText}>₹ 1000.00</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text
                                    style={{ color: "#546881", marginBottom: "5%" }}>Aadhaar Number :</Text>
                                <Text style={styles.valueText}>XXXX XXXX 4561</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text
                                    style={{ color: "#546881", marginBottom: "5%" }}>Message :</Text>
                                <Text style={styles.valueText}>N/A</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text
                                    style={{ color: "#546881", marginBottom: "5%" }}>Closing Balance :</Text>
                               <Text style={styles.valueText}>₹ 1000.00</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text
                                    style={{ color: "#546881", marginBottom: "5%" }}>Mobile :</Text>
                               <Text style={styles.valueText}>   +91 8549724654</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text
                                    style={{ color: "#546881", marginBottom: "5%" }}>Bank Name :</Text>
                                <Text style={styles.valueText}>   +91 8549724654</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                marginTop: "5%",
                                width: '100%',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10
                            }}>
                                <Text
                                    style={{ color: "#546881", marginBottom: "5%" }}>API TID :</Text>
                                <Text style={styles.valueText}>   +91 8549724654</Text>
                            </View>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.printBtn}>
                                <Feather name="printer" size={20} color="#000" />
                                <Text style={styles.printText}>Print</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.downloadBtn}>
                                <Feather name="download" size={20} color="#FFFFFF" />
                                <Text style={styles.downloadText}>Download</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    {/* </ImageBackground> */}
                </View>
            )}
        </>

    );
};



export default TransactionSummary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backIcon: {
        margin: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 16,
        color: '#1D242D',
    },
    logo: {
        width: 200,
        height: 40,
        alignSelf: 'center',
        marginVertical: 12,
    },
    status: {
        color: '#52C41A',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    amount: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    card: {
        // backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 16,
        padding: 12,
        // elevation: 4,
        // shadowColor: '#ccc',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1D242D',
        marginBottom: 6,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        color: '#000',
        textAlignVertical: 'center',
        alignSelf: 'center',
        marginLeft: 10,
    },
    loaderView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 67,
        width: 180,
        justifyContent: 'center',
        borderRadius: 5,
    },

    errorText: {
        color: 'red',
        fontSize: 14,
        margin: "2%"
        // marginLeft:"4%",
        // marginBottom: '2%',
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: "5%",
        borderBottomWidth: 0.3,
        borderBottomColor: '#546881',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: '#B22222', // Firebrick red similar to the image
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        minWidth: "90%", // or use width: '80%' for responsive
        height: "12%"
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
    },
    label: {
        color: '#A3ADBB',
        fontSize: 14,
        fontWeight: '400',
        flex: 1,
    },
    value: {
        color: '#1D242D',
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEF0F1',
        marginVertical: 8,
    },
    transferBox: {
        marginTop: 20,
        marginHorizontal: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: '#EEF0F1',
        borderRadius: 6,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
    },
    transferLabel: {
        fontSize: 14,
        color: '#1D242D',
        marginBottom: 4,
    },
    transferAmount: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1D242D',
    },
    autoCashout: {
        color: '#A3ADBB',
        fontSize: 13,
        marginTop: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 20,
    },
    printBtn: {
        borderWidth: 1,
        borderColor: '#A3ADBB',
        borderRadius: 4,
        width: '48%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    printText: {
        fontWeight: '500',
        color: '#000',
    },
    downloadBtn: {
        backgroundColor: '#028A3B',
        borderRadius: 4,
        width: '48%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    downloadText: {
        fontWeight: '500',
        color: '#FFFFFF',
    },
    valueText:{
        fontSize: 14, 
        fontWeight: "400", 
        color: "#1D242D", 
        marginBottom: "5%" 
    }
});

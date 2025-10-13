import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReceiptDetails = () => {
    return (
        <View style={{ backgroundColor: "#ffffff" }}>
            <Text style={{ fontSize: 16, fontWeight: "600", padding: 20 }}>From</Text>
            <Text style={{ fontSize: 14, fontWeight: "400", paddingHorizontal: 30 }}>Customer Mobile Number      :     91 79986636363</Text>
            <Text style={{ fontSize: 16, fontWeight: "600", padding: 20 }}>To</Text>
            <View style={styles.modalContainer}>

                <View style={styles.rowContainer}>
                    <Text style={{ color: "#546881", marginBottom: "5%" }}>Name :</Text>
                    <Text style={styles.valueText}>Krishna Das</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={{ color: "#546881", marginBottom: "5%" }}>Account Number :</Text>
                    <Text style={styles.valueText}>+91 9872541456</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={{ color: "#546881", marginBottom: "5%" }}>Bank Name :</Text>
                    <Text style={styles.valueText}>ICICI Bank</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={{ color: "#546881", marginBottom: "5%" }}>Date/ Time :</Text>
                    <Text style={styles.valueText}>10/05/2024, 16:07AM</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text
                        style={{ color: "#546881", marginBottom: "5%" }}>Transaction ID :</Text>
                    <Text style={styles.valueText}>#57386294267748390</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text
                        style={{ color: "#546881", marginBottom: "5%" }}>Transaction Mode :</Text>
                    <Text style={styles.valueText}>NEFT_FUND_TRANSFER</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text
                        style={{ color: "#546881", marginBottom: "5%" }}>Shop Name :</Text>
                    <Text style={styles.valueText}>ICICIN00013546</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text
                        style={{ color: "#546881", marginBottom: "5%" }}>Description :</Text>
                    <Text style={styles.valueText}>ICICIN00013546</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text
                        style={{ color: "#546881", marginBottom: "5%" }}>Status :</Text>
                    <Text style={styles.valueText}>Failed</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text
                        style={{ color: "#546881", marginBottom: "5%" }}>RRN :</Text>
                    <Text style={styles.valueText}>Failed</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text
                        style={{ color: "#546881", marginBottom: "5%" }}>Txn ID :</Text>
                    <Text style={styles.valueText}>Failed</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text
                        style={{ color: "#546881", marginBottom: "5%" }}>Amount :</Text>
                    <Text style={styles.valueText}>₹ 1000.00</Text>
                </View>

            </View>
        </View>


    )
}

export default ReceiptDetails

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
        backgroundColor: '#ffffff',
        padding: 20,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'space-between',
        // alignItems:"center"
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: "3%",
        width: '90%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
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
        backgroundColor: '#028A3B',
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
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        width: "98%",
        borderWidth: 0.4
        // elevation: 3,
    },
    labelText: {
        color: '#546881',
        fontSize: 15,
        marginBottom: '6%',
    },
    valueText: {
        color: '#1D242D',
        fontWeight: '500',
        width: "45%"
    },
    boldText: {
        color: '#1D242D',
        fontWeight: '600',
    },
    rowSpace: {
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
        // alignItems: 'center',
        marginBottom: 6,
        borderWidth: 0.4,
        borderRadius: 4,
        padding: 8,
        // width: '100%',
        alignSelf: 'flex-end',
    },
    actionText: {
        fontSize: 16,
        fontWeight: '500',
    },
})
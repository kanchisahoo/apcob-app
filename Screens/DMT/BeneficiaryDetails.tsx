import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CarouselComponent from '../Home/components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';

type BeneItem = {
    bankCode: any;
    id: string;
    name: string;
    accountNumber: string;
    bankName: string;
    mobileNumber: string;
    customerMobileNumber: string;
    ifscCode: string;
    statusDesc: string
};
const BeneficiaryList = () => {
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [searchText, setSearchText] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [vid, setVid] = useState('');
    const navigation = useNavigation();
    const [selectedBene, setSelectedBene] = useState<BeneItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [verificationModal, setVerificationModal] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<'Gateway-1' | 'Gateway-2' | 'Gateway-3'>(
        'Gateway-1',
    );
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<'IMPS' | 'NEFT'>('IMPS');

    const [amount, setAmount] = useState('');
    const [splitData, setSplitData] = useState<
        { id: number; value: number; status: string }[]
    >([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [error, setError] = useState({
        number: '',
        name: '',
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
    const handleNameField = (text: string) => {
        let errorMessage = '';
        if (!text) {
            errorMessage = 'Name is required';
        }
        setName(text);
        setError(prev => ({ ...prev, number: errorMessage }));
    }
    const beneList = [{
        id: "1",
        name: "Kanchi",
        bankName: "ICICI Bank",
        accountNumber: 1354657948,
        customerMobileNumber: "9345678736"
    },

    ]
    const UserCard = ({ item }: { item: (typeof beneList)[0] }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("BeneficiaryDetails" as never, { items: item })
            }
        >
            <TouchableOpacity>
                <Text style={[styles.actionText, { color: '#0E8345', alignSelf: "flex-end" }]}>Verified</Text>
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Text style={styles.labelText}>
                    Name: <Text style={styles.boldText}>{item?.name}</Text>
                </Text>
                {/* <Text style={[styles.status, { color: item.isVerified ? '#0E8345' : '#C70039' }]}>
                    {item.isVerified ? 'Verified' : 'Unverified'}
                </Text> */}
            </View>
            <Text style={styles.labelText}>
                Bank Name: <Text style={styles.valueText}>{item?.bankName}</Text>
            </Text>
            <Text style={styles.labelText}>
                Bank Account Number:{' '}
                <Text style={styles.valueText}>{item?.accountNumber}</Text>
            </Text>
            <Text style={styles.labelText}>
                Mobile Number:{' '}
                <Text style={styles.valueText}>{item?.customerMobileNumber}</Text>
            </Text>

            <View style={styles.rowSpace}>

                <TouchableOpacity onPress={() => onClick(item)}>
                    <Text style={[styles.actionText, { color: '#595959' }]}>Select Another</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
    const onClick = (item: BeneItem) => {
        setSelectedBene(item);
        setVerificationModal(true);
    };
    const handleAmountChange = (text: string) => {
        setAmount(text);

        const numericAmount = parseInt(text, 10);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setError(prev => ({
                ...prev,
                amount: 'Enter a valid amount greater than 0',
            }));
            setSplitData([]);
            return;
        }

        setError(prev => ({ ...prev, amount: '' }));

        const chunk = 5000;
        const parts: { id: number; value: number; status: string }[] = [];
        let remaining = numericAmount;
        let index = 1;

        while (remaining > 0) {
            const currentValue = remaining >= chunk ? chunk : remaining;
            parts.push({ id: index, value: currentValue, status: 'initiated' });
            remaining -= currentValue;
            index++;
        }

        setSplitData(parts); // Always update the number

        // 3. Check if full 10-digit number is entered
        if (!text) {
            setError(prev => ({ ...prev, amount: 'Please Enter The Amount' }));
            setIsModalVisible(true); // ✅ Only show modal if all validations pass
        } else if (text >= JSON.parse(decryptedData)?.customerLimit?.p1Limit + 1) {
            setError(prev => ({ ...prev, amount: 'Limit Exceeded' }));
            setIsModalVisible(true); // ✅ Only show modal if all validations pass
        } else if (text < '100') {
            setError(prev => ({ ...prev, amount: 'Limit Subceeded' }));
            setIsModalVisible(true); // ✅ Only show modal if all validations pass
        } else {
            setError(prev => ({ ...prev, amount: '' }));
            setIsModalVisible(false); // Hide modal if number is not yet complete
        }
    };
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <ScrollView
                contentContainerStyle={{ paddingVertical: 0, marginVertical: 0 }}
                showsVerticalScrollIndicator={false}
            >
                <CarouselComponent />
                <View style={{ marginTop: "6%" }}>
                    <Text style={{ color: "#8C8C8C" }}>Fill All The Details * </Text>
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
                            handleNameField(text);
                            // if (error.number) setError({ ...error, number: '' });
                        }}
                        value={name || ''}
                        placeholder="Enter Customer Name"
                        placeholderTextColor={'#909DAD'}
                    />
                    {error.name ? (
                        <Text style={styles.errorText}>{error.name}</Text>
                    ) : null}
                </View>
                <Text style={{ color: "#00000", alignSelf: "flex-end", marginTop: "5%" }}>Change Name</Text>
                <View >
                    <Text style={{ color: "#8C8C8C" }}>Beneficiaries</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text: any) => {
                            setSearchText(text);
                            // if (error.number) setError({ ...error, number: '' });
                        }}
                        value={searchText || ''}
                        placeholder="Search"
                        placeholderTextColor={'#909DAD'}
                    />

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.transferButton}>
                        <Text style={styles.yesText}>Add</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={beneList}
                    keyExtractor={item => item?.id}
                    contentContainerStyle={{
                        marginTop: "5%"
                        // padding: 16,
                        // paddingBottom: 100,
                    }}
                    renderItem={({ item }) => <UserCard item={item} />}
                />
                <View
                    style={{
                        width: '65%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        paddingVertical: '5%',
                    }}>
                    <TouchableOpacity
                        onPress={() => setSelectedOption('Gateway-1')}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '50%',
                            height: 40,
                            justifyContent: 'space-evenly',
                        }}>
                        <MaterialIcons
                            name={
                                selectedOption === 'Gateway-1'
                                    ? 'radio-button-checked'
                                    : 'radio-button-off'
                            }
                            color={'#028A3B'}
                            size={18}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                // right: 10
                            }}>
                            Gateway-1
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelectedOption('Gateway-2')}
                        style={{

                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '50%',
                            height: 40,
                            justifyContent: 'space-evenly',
                        }}>
                        <MaterialIcons
                            name={
                                selectedOption === 'Gateway-2'
                                    ? 'radio-button-checked'
                                    : 'radio-button-off'
                            }
                            color={'#028A3B'}
                            size={18}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                // right: 10,
                            }}>
                            Gateway-2
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedOption('Gateway-3')}
                        style={{

                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '50%',
                            height: 40,
                            justifyContent: 'space-evenly',
                        }}>
                        <MaterialIcons
                            name={
                                selectedOption === 'Gateway-3'
                                    ? 'radio-button-checked'
                                    : 'radio-button-off'
                            }
                            color={'#028A3B'}
                            size={18}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                // right: 10,
                            }}>
                            Gateway-3
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    value={amount}
                    keyboardType="numeric"
                    placeholder="Enter the Amount"
                    maxLength={10}
                    onChangeText={handleAmountChange}
                    contextMenuHidden={true}
                    placeholderTextColor="#546881"
                />
                {error.amount ? (
                    <Text style={styles.errorText}>{error.amount}</Text>
                ) : null}
                <Text
                    style={{
                        color: '#909DAD',
                        fontSize: 16,
                        marginLeft: '4.5%',
                        marginTop: '4%',
                    }}>
                    Available Limit:{' '}
                    <Text style={{ fontWeight: '600', color: '#000000' }}>
                        ₹10000
                        {/* ₹ {JSON.parse(decryptedData)?.customerLimit?.p1Limit} */}
                    </Text>
                </Text>
                <View
                    style={{
                        width: '65%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        paddingVertical: '5%',
                    }}>
                    <TouchableOpacity
                        onPress={() => setSelectedPaymentOption('IMPS')}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '50%',
                            height: 40,
                            justifyContent: 'space-evenly',
                        }}>
                        <MaterialIcons
                            name={
                                selectedPaymentOption === 'IMPS'
                                    ? 'radio-button-checked'
                                    : 'radio-button-off'
                            }
                            color={'#028A3B'}
                            size={18}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                // right: 10
                            }}>
                            IMPS
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setSelectedPaymentOption('NEFT')}
                        style={{

                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '50%',
                            height: 40,
                            justifyContent: 'space-evenly',
                        }}>
                        <MaterialIcons
                            name={
                                selectedPaymentOption === 'NEFT'
                                    ? 'radio-button-checked'
                                    : 'radio-button-off'
                            }
                            color={'#028A3B'}
                            size={18}
                        />
                        <Text
                            style={{
                                fontSize: 14,
                                textAlign: 'center',
                                // right: 10,
                            }}>
                            NEFT
                        </Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#028A3B',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                        marginTop: '5%',
                        borderRadius: 4,
                        width: '30%',
                        alignSelf: 'flex-end',
                    }}
                    // disabled={!isChecked && !selectedDevice}
                    onPress={() => {
                        setModalVisible(true);
                        //   onPayClick();
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#fff', // Keep text color consistent
                        }}>
                        Pay
                    </Text>
                </TouchableOpacity>
                <Modal
                    transparent
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalContainer}>
                            <Text style={{ width: "100%", fontSize: 16, fontWeight: "500" }}>Confirm your Transaction</Text>
                            <View style={{ alignItems: "center" }}>
                                <View style={{ alignItems: "center", alignSelf: "center" }}>

                                    <View style={styles.rowContainer}>
                                        <Text style={{ color: "#546881", marginBottom: "5%" }}>   Name :</Text>
                                        <Text style={styles.valueText}>Krishna Das</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text style={{ color: "#546881", marginBottom: "5%" }}>Customer Mobile :</Text>
                                        <Text style={styles.valueText}>+91 9872541456</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text style={{ color: "#546881", marginBottom: "5%" }}>Bank Name :</Text>
                                        <Text style={styles.valueText}>ICICI Bank</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text style={{ color: "#546881", marginBottom: "5%" }}>Bank Account Number :</Text>
                                        <Text style={styles.valueText}>1354657948</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text
                                            style={{ color: "#546881", marginBottom: "5%" }}>Beneficiary Name :</Text>
                                        <Text style={styles.valueText}>Krishna Das</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text
                                            style={{ color: "#546881", marginBottom: "5%" }}>Beneficiary Mobile :</Text>
                                        <Text style={styles.valueText}>+91 9872541456</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text
                                            style={{ color: "#546881", marginBottom: "5%" }}>Bank IFSC :</Text>
                                        <Text style={styles.valueText}>ICICIN00013546</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text
                                            style={{ color: "#546881", marginBottom: "5%" }}>Amount :</Text>
                                        <Text style={styles.valueText}>₹ 1000.00</Text>
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
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.usbButton} onPress={()=>setModalVisible(false)}>
                                    <Text style={styles.usbText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.yesButton} onPress={()=>{setModalVisible(false),navigation.navigate("Receipt" as never)}}>
                                    <Text style={styles.yesText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>

        </SafeAreaView>
    )
}

export default BeneficiaryList

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
        width: 320,
        height: "60%",
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 20,
        elevation: 5,
        justifyContent: 'space-between',
        // alignItems:"center"
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: "3%",
        width: '100%',
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
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CarouselComponent from '../Home/components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    const navigation = useNavigation();
    const [selectedBene, setSelectedBene] = useState<BeneItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [verificationModal, setVerificationModal] = useState(false)
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
    {
        id: "2",
        name: "Kanchi",
        bankName: "ICICI Bank",
        accountNumber: 1354657948,
        customerMobileNumber: "9345678736"
    },
    {
        id: "3",
        name: "Kanchi",
        bankName: "ICICI Bank",
        accountNumber: 1354657948,
        customerMobileNumber: "9345678736"
    },
    {
        id: "4",
        name: "Kanchi",
        bankName: "ICICI Bank",
        bankAccountNumber: 1354657948,
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
                    <Text style={[styles.actionText, { color: '#0E8345',alignSelf:"flex-end" }]}>Verified</Text>
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
                        marginTop:"5%"
                        // padding: 16,
                        // paddingBottom: 100,
                    }}
                    renderItem={({ item }) => <UserCard item={item} />}
                />
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
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        width:"98%",
        borderWidth:0.4
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
        borderWidth:0.4,
        borderRadius:4,
        padding:8,
        // width: '100%',
        alignSelf: 'flex-end',
    },
    actionText: {
        fontSize: 16,
        fontWeight: '500',
    },
})
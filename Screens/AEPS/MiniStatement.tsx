import { NativeModules, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import CustomDropdown from '../../utils/HOC/CustomDropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MiniStatement = () => {
    const [selectedOption, setSelectedOption] = useState<'Aadhaar' | 'Virtual ID'>(
        'Aadhaar',
    );
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authenticationFailed, setAuthenticationFailed] = useState(false);
    const [failureMessage, setFailureMessage] = useState<string>('');
    const [amount, setAmount] = useState('');
    const [number, setNumber] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [vid, setVid] = useState('');
    const [error, setError] = useState({
        number: '',
        aadhaar: '',
        vid: '',
        bank: '',
        amount: '',
    });
    const [bank, setBank] = useState<{ iin: string; bank_name: string }>({
        iin: '',
        bank_name: '',
    });


    const toggleCheckbox = () => setIsChecked(!isChecked);
    const [area, setArea] = useState([]);
    const { FindDevice } = NativeModules; // m
    const fetchBankName = async () => {
        setLoading(true);
        try {
            const data = {
                operation_performed: 'uaeps_be',
            };
            const response = await axios.post(
                'https://centralize-banklist-v2.txninfra.com/aeps-iin-bank/display-bank-details',
                data,
            );
            console.log('dropdownnnnnnnnnnnn Response:', response.data.data);
            setArea(response.data.data);
        } catch (error) {
            console.error('Error fetching Mini Statement:', error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchBankName();
    }, []);
    const handleAmount = (text: string) => {
        let errorMessage = '';

        if (!text) {
            errorMessage = 'Please Enter The Amount';
        }
        setAmount(text);

        setError(prev => ({ ...prev, amount: errorMessage }));
    };
    const validateAadharOrVID = (input: string): boolean => {
        if (!input) return false;

        // Remove all non-digit characters
        const cleanInput = input.replace(/\D+/g, '');

        // Check for valid Aadhaar or VID length
        const isAadhaar = cleanInput.length === 12;
        const isVID = cleanInput.length === 16;

        if (!isAadhaar && !isVID) return false;

        // Block known dummy Aadhaar numbers
        const invalidAadhaars = [
            '123412341234',
            '999999999999',
            '666666666666',
            '333333333333',
        ];
        if (isAadhaar && invalidAadhaars.includes(cleanInput)) return false;

        // Verhoeff algorithm tables
        const d = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
            [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
            [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
            [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
            [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
            [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
            [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
            [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
            [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        ];

        const p = [
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
            [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
            [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
            [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
            [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
            [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
            [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
        ];

        let c = 0;
        const invertedArray = cleanInput.split('').reverse().map(Number);

        invertedArray.forEach((val, i) => {
            c = d[c][p[i % 8][val]];
        });

        return c === 0;
    };

    const validateFields = (): boolean => {
        let isValid = true;
        let newErrors: any = { number: '', aadhaar: '', vid: '', bank: '' };


        if (!number) {
            newErrors.number = 'Mobile Number is required';
            isValid = false;
        } else if (!/^\d+$/.test(number)) {
            newErrors.number = 'Only numeric values are allowed';
            isValid = false;
        } else if (!/^[6-9]\d{9}$/.test(number)) {
            newErrors.number =
                'Enter a valid 10-digit mobile number starting with 6-9';
            isValid = false;
        }

        if (selectedOption === 'Aadhaar') {
            if (!aadhaar) {
                newErrors.aadhaar = 'Aadhaar Number is required';
                isValid = false;
            } else if (!validateAadharOrVID(aadhaar)) {
                newErrors.aadhaar = 'Please enter a valid Aadhaar number';
                isValid = false;
            }
        } else if (selectedOption === 'Virtual ID') {
            if (!vid) {
                newErrors.vid = 'Virtual ID Number is required';
                isValid = false;
            } else if (!validateAadharOrVID(vid)) {
                newErrors.vid = 'Please enter a valid Virtual ID number';
                isValid = false;
            }
        }
        // Validate Bank selection (bank)
        if (!bank.bank_name || !bank.iin) {
            newErrors.bank = 'Please select a bank.';
            isValid = false;
        }

        setError(newErrors);
        return isValid;
    };

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
    const handleAadhaarFee = (text: string) => {
        let errorMessage = '';

        if (selectedOption === 'Aadhaar') {
            if (!text) {
                errorMessage = 'Aadhaar Number is required';
            } else if (!validateAadharOrVID(text)) {
                errorMessage = 'Please enter a valid Aadhaar number';
            }
            setAadhaar(text);
            setError(prev => ({ ...prev, aadhaar: errorMessage }));
        } else if (selectedOption === 'Virtual ID') {
            if (!text) {
                errorMessage = 'Virtual ID Number is required';
            } else if (!validateAadharOrVID(text)) {
                errorMessage = 'Please enter a valid Virtual ID number';
            }
            setVid(text);
            setError(prev => ({ ...prev, vid: errorMessage }));
        }

    };

    const handleBankName = (text: { iin: '', bank_name: '' }) => {
        let errorMessage = '';

        if (!text.iin || !text.bank_name) {
            errorMessage = 'Bank Name is required';
        }
        setBank(text);

        setError(prev => ({ ...prev, bank: errorMessage }));
    };


    const capture = () => {
        if (validateFields()) {
            setModalVisible(true);
        }
    };

    return (
        <ScrollView>
 <View style={{ backgroundColor: "#FFFFFF", flex: 1, padding: 10 }}>
            <View
                style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    paddingVertical: '5%',
                }}>
                <TouchableOpacity
                    onPress={() => setSelectedOption('Aadhaar')}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '48%',
                        height: 40,
                        justifyContent: 'space-evenly',
                    }}>
                    <MaterialIcons
                        name={
                            selectedOption === 'Aadhaar'
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
                            right: 15,
                        }}>
                        Aadhaar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedOption('Virtual ID')}
                    style={{

                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '48%',
                        height: 40,
                        justifyContent: 'space-evenly',
                    }}>
                    <MaterialIcons
                        name={
                            selectedOption === 'Virtual ID'
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
                            right: 15,
                        }}>
                        Virtual ID
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <View >
                    <Text style={{ color: "#8C8C8C" }}>Mobile Number</Text>
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
                </View>
                {selectedOption === 'Aadhaar' ? (
                    <View>
                        <Text style={{ color: "#8C8C8C", marginTop: "2%" }}>Aadhaar Number</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => {
                                handleAadhaarFee(text);
                                // if (aadhaarError) setAadhaarError(''); // remove error as user types
                            }}
                            value={aadhaar || ''}
                            placeholder="Enter Aadhaar Number"
                            placeholderTextColor={'#909DAD'}
                            maxLength={12}
                            keyboardType="number-pad"
                        />
                        {error.aadhaar ? (
                            <Text style={styles.errorText}>{error.aadhaar}</Text>
                        ) : null}
                    </View>
                ) : (
                    <View>
                        <Text style={{ color: "#8C8C8C", marginTop: "2%" }}>Virtual ID</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => {
                                handleAadhaarFee(text);
                                // if (aadhaarError) setAadhaarError(''); // remove error as user types
                            }}
                            value={vid || ''}
                            placeholder="Enter Virtual ID Number"
                            placeholderTextColor={'#909DAD'}
                            maxLength={16}
                            keyboardType="number-pad"
                        />
                        {error.vid ? (
                            <Text style={styles.errorText}>{error.vid}</Text>
                        ) : null}
                    </View>
                )}
                <Text style={{ color: "#8C8C8C", marginTop: "2%" }}>Bank</Text>
                <CustomDropdown
                    dropdownStyle={{ marginTop: 10 }}
                    options={area?.map((bank: any, index: any) => ({
                        label: bank.bank_name,
                        value: bank,
                    }))}
                    // options={area}
                    selectedValue={bank}
                    onValueChange={value => handleBankName(value)}
                    placeholder="Select Bank"
                />
                {error.bank ? (
                    <Text style={styles.errorText}>{error.bank}</Text>
                ) : null}
                <Text style={{ color: "#8C8C8C", marginTop: "2%" }}>Amount</Text>
                <TextInput
                    value={amount}
                    onChangeText={(value: any) => handleAmount(value)}
                    placeholder="Enter the Amount"
                    style={styles.input}
                    keyboardType="number-pad"
                    placeholderTextColor="#888"
                />
                {error.amount ? (
                    <Text style={styles.errorText}>{error.amount}</Text>
                ) : null}

                <TouchableOpacity
                    style={{

                        paddingHorizontal: '5%',
                        alignItems: 'center',
                        justifyContent: "center",
                        height: 150,
                        marginTop: '5%',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        borderColor: '#000',
                    }}
                    onPress={() => capture()}>

                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Ionicons
                            name="scan-outline"
                            size={50}
                        ></Ionicons>
                        <MaterialIcons
                            name="fingerprint"
                            size={30}
                            color={'#546881'}
                            style={{ position: "absolute", alignSelf: "center" }}></MaterialIcons>
                    </View>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#000', // Keep text color consistent
                            marginTop: "4%"
                        }}>
                        Capture the Fingerprint
                    </Text>
                    <Text style={{ color: '#909DAD', fontSize: 14, marginTop: '3%', }}>
                        Recommended Strength: 40%
                    </Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity  style={{
                    backgroundColor: '#028A3B',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    marginVertical: '5%',
                    borderRadius: 10,
                  }}>
                <Text  style={{fontWeight: '400', fontSize: 14, color: '#FFFFFF'}}>Capture</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
       
    )
}

export default MiniStatement

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop: 10,
        fontSize: 14,
    },
    input: {
        height: 45,
        marginTop: 10,
        borderWidth: 0.2,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#ffffff',
    },
})
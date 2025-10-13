import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  Pressable,
} from 'react-native';
import Stepper from './Stepper';
import Entypo from '@react-native-vector-icons/entypo';
import { Picker } from '@react-native-picker/picker';
import KycVerificationModal from './KycVerificationModal';

const BasicInfo: React.FC = () => {
  const navigator = useNavigation();
  const [sameAsShopAddress, setSameAsShopAddress] = useState(false);
  const [yourState, setYourState] = useState('');
  const [yourDistrict, setYourDistrict] = useState('');
  const [kycVerifyOpen, setKycVerifyOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Stepper currentStep={4} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Basic Information</Text>
          <Text style={styles.subtitle}>Fill All The Shop Details</Text>
        </View>

        <Text style={styles.label}>Shop Image</Text>
        <View style={styles.uploadBox}>
          <Entypo name="attachment" size={16} color="#666" />
          <Text style={styles.uploadSubText}>Upload Shop Image</Text>
        </View>

        <Text style={styles.label}>Shop Owner Name</Text>
        <TextInput style={styles.input} placeholder="Enter Shop Owner Name" />

        <Text style={styles.label}>Shop Name</Text>
        <TextInput style={styles.input} placeholder="Enter Shop Name" />

        <Text style={styles.label}>Shop Address</Text>
        <TextInput style={styles.input} placeholder="Enter Shop Address" />

        <Text style={styles.label}>Shop City</Text>
        <TextInput style={styles.input} placeholder="Enter Shop City" />

        <Text style={styles.label}>Shop Pin Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Shop Pin Code"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Shop State</Text>
        <TextInput style={styles.input} placeholder="Select Shop State" />

        <Text style={styles.label}>Shop District</Text>
        <TextInput style={styles.input} placeholder="Select Shop District" />

        {/* Checkbox Row */}
        <View style={styles.checkboxRow}>
          <Pressable
            style={[
              styles.checkbox,
              sameAsShopAddress && styles.checkedCheckbox,
            ]}
            onPress={() => setSameAsShopAddress(!sameAsShopAddress)}
          >
            {sameAsShopAddress && <Text style={styles.checkmark}>✓</Text>}
          </Pressable>
          <Text style={styles.checkboxLabel}>Same As Shop Address</Text>
        </View>

        <Text style={styles.label}>GST Number</Text>
        <TextInput style={styles.input} placeholder="Enter GST Number" />

        <Text style={styles.label}>Annual Income</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Annual Income"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Your Address</Text>
        <TextInput style={styles.input} placeholder="Enter Your Address" />

        <Text style={styles.label}>Your PIN Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your PIN Code"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Your State</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={yourState}
            onValueChange={itemValue => setYourState(itemValue)}
          >
            <Picker.Item label="Select State" value="" color="#8C8C8C" />
            <Picker.Item label="Odisha" value="Odisha" />
          </Picker>
        </View>

        <Text style={styles.label}>Your District</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={yourDistrict}
            onValueChange={itemValue => setYourDistrict(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select District" value="" color="#8C8C8C" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => setKycVerifyOpen(true)}
        >
          <Text style={styles.startBtnText}>Proceed to Capture</Text>
        </TouchableOpacity>
      </ScrollView>
      <KycVerificationModal
        visible={kycVerifyOpen}
        onClose={() => setKycVerifyOpen(false)}
        onStartKyc={() => {}}
      />
    </View>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  header: { marginBottom: 20, marginTop: 30 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 8 },
  label: { fontSize: 14, marginBottom: 6, color: '#8C8C8C' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 15,
  },
  uploadBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 15,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  uploadSubText: { fontSize: 14, color: '#5a5a5aff' },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 15,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: { backgroundColor: 'green', borderColor: 'green' },
  checkmark: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  checkboxLabel: { fontSize: 14, color: '#8C8C8C' },
  startBtn: {
    backgroundColor: 'green',
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  startBtnText: { textAlign: 'center', color: 'white' },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 15,
  },
  picker: {
    fontSize: 14,
  },
});

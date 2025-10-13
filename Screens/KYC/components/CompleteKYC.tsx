import AntDesign from '@react-native-vector-icons/ant-design';
import Lucide from '@react-native-vector-icons/lucide';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

const CompleteKYC: React.FC = () => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.h}>Welcome!</Text>
        <Text style={styles.title}>Complete Your KYC</Text>
        <Text style={styles.subtitle}>We are ready to complete your KYC</Text>
        <View style={styles.box}>
          <View style={styles.row}>
            <AntDesign name="check-square" size={18} />
            <Text>User Consent & Declaration</Text>
          </View>
          <View style={styles.row}>
            <Lucide name="folder-symlink" size={18} />
            <Text>PAN Verification</Text>
          </View>
          <View style={styles.row}>
            <MaterialDesignIcons name="file-document-outline" size={18} />
            <Text>Aadhaar Verification</Text>
          </View>
          <View style={styles.rowLast}>
            <AntDesign name="exclamation-circle" size={18} />
            <Text>Basic Information</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => {
          navigator.navigate('UserConsentDeclaration');
        }}
      >
        <Text style={styles.startBtnText}>I Agree</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteKYC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  h: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 10,
    color: '#028A3B',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  box: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowLast: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    padding: 20,
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
  },
  startBtn: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  startBtnText: {
    textAlign: 'center',
    color: 'white',
  },
});

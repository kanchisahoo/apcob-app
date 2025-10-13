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

const KycScreen: React.FC = () => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Verify Your Number</Text>
        <Text style={styles.subtitle}>
          This is a dummy KYC screen. Add your form here.
        </Text>
        <Text style={{ marginBottom: 8, marginTop: 20 }}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile Number"
          keyboardType="default"
          maxLength={10}
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => {
          navigator.navigate('KycVerifyMail');
        }}
      >
        <Text style={styles.startBtnText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KycScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },

  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  startBtn: {
    backgroundColor: 'green',
    paddingVertical: 8,
    borderRadius: 4,
  },
  startBtnText: {
    textAlign: 'center',
    color: 'white',
  },
});

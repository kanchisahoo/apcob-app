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

const VerifyMail: React.FC = () => {
      const navigator = useNavigation();
    
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Verify Your Mail</Text>
        <Text style={styles.subtitle}>
          Verify Email To Get The Notification In Email. The Email Verification
          Is Required To reset your password as well in the future
        </Text>
        <Text style={{ marginBottom: 8, marginTop: 20 }}>Email ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email ID"
          keyboardType="default"
          maxLength={10}
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.startBtn} onPress={() => {
          navigator.navigate('CompleteKYC');
        }}>
        <Text style={styles.startBtnText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyMail;

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

import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Stepper from './Stepper';
// import DocumentPicker from 'react-native-document-picker';
import AntDesign from '@react-native-vector-icons/ant-design';

const PANVerification: React.FC = () => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <Stepper currentStep={1} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>PAN Verification</Text>
          <Text style={styles.subtitle}>
            Upload front side of your PAN Card
          </Text>

          <TouchableOpacity style={styles.uploadBox}>
            <AntDesign name="cloud-upload" size={50} color="#ccc" />
            <Text style={styles.uploadText}>
              Drag and Drop files or{' '}
              <Text
                style={{ color: '#088586', textDecorationLine: 'underline' }}
              >
                Browse
              </Text>{' '}
            </Text>
            <Text style={styles.uploadSubText}>
              JPEG, PNG, PDF, and MP4 formats, up to 5MB
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => navigator.navigate('AadhaarVerification')}
      >
        <Text style={styles.startBtnText}>Next</Text>
      </TouchableOpacity>
    </View>

  );
};

export default PANVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  uploadBox: {
    width: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: '#333',
  },
  uploadSubText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
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

import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Stepper from '../components/Stepper';

const UserConsentDeclaration: React.FC = () => {
  const navigator = useNavigation();

  const [residentIndia, setResidentIndia] = useState(false);
  const [physicallyPresent, setPhysicallyPresent] = useState(false);
  const [above18, setAbove18] = useState(false);

  return (
    <View style={styles.container}>
      <Stepper currentStep={0} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>User Consent & Declaration</Text>
          <Text style={styles.subtitle}>
            I consent to you collecting my Aadhaar/ PAN and storing and using
            the same for the purpose of KYC. I understand that by clicking
            proceed, I will be confirming that the information given in this
            form is true, complete and accurate.
          </Text>

          <View style={styles.box}>
            <View style={styles.row}>
              <Text>I am a resident of India</Text>
              <Switch
                trackColor={{ false: '#ccc', true: '#028A3B' }}
                thumbColor="#fff"
                ios_backgroundColor="#ccc"
                onValueChange={() => setResidentIndia(prev => !prev)}
                value={residentIndia}
              />
            </View>
            <View style={styles.row}>
              <Text>I am physically present in India</Text>
              <Switch
                trackColor={{ false: '#ccc', true: '#028A3B' }}
                thumbColor="#fff"
                ios_backgroundColor="#ccc"
                onValueChange={() => setPhysicallyPresent(prev => !prev)}
                value={physicallyPresent}
              />
            </View>
            <View style={styles.rowLast}>
              <Text>I am above the age of 18 year</Text>
              <Switch
                trackColor={{ false: '#ccc', true: '#028A3B' }}
                thumbColor="#fff"
                ios_backgroundColor="#ccc"
                onValueChange={() => setAbove18(prev => !prev)}
                value={above18}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => {
          navigator.navigate('PANVerification');
        }}
      >
        <Text style={styles.startBtnText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserConsentDeclaration;

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
  box: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  startBtn: {
    backgroundColor: 'green',
    paddingVertical: 8,
    borderRadius: 4,
  },
  startBtnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});

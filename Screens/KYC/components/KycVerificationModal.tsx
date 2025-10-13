// KycVerificationModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onStartKyc: () => void;
};

const KycVerificationModal: React.FC<Props> = ({
  visible,
  onClose,
  onStartKyc,
}) => {
  const navigator = useNavigation();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/images/kyc_verification_success.png')}
            style={styles.image}
          />
          <Text style={styles.title}>KYC Verification Successful!</Text>
          <Text style={styles.message}>
            Your identity is verified. Let’s get started!
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => {
                onStartKyc();
                navigator.navigate('Tabs');
              }}
            >
              <Text style={styles.startBtnText}>Return to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default KycVerificationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  buttonRow: {
    width: '100%',
  },
  exitWrapper: {
    marginRight: 15,
  },
  exitBtn: {
    fontSize: 16,
    color: 'red',
    fontWeight: '500',
  },
  startBtn: {
    backgroundColor: 'green',
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  startBtnText: {
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    marginVertical: 10,
  },
});

// KycModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onStartKyc: () => void;
};

const KycModal: React.FC<Props> = ({ visible, onClose, onStartKyc }) => {
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
          <Text style={styles.title}>KYC Status</Text>
          <Text style={styles.message}>Please Complete Your KYC</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.exitWrapper}>
              <Text style={styles.exitBtn}>Exit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => {
                onStartKyc();
                navigator.navigate('Kyc');
              }}
            >
              <Text style={styles.startBtnText}>Start KYC</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default KycModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    elevation: 5,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  exitWrapper: {
    marginRight: 15,
  },
  exitBtn: {
    fontSize: 16,
    color: '#F5222D',
    fontWeight: '500',
  },
  startBtn: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  startBtnText: {
    color: 'white',
    fontWeight: '600',
  },
});

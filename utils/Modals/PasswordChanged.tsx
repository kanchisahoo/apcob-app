import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';

interface inputProps {
  visible: boolean;
  onClose: () => void;
  onBackToLogin?: () => void;
}

const PasswordChanged: React.FC<inputProps> = ({ visible, onClose, onBackToLogin }) => {
  const navigation = useNavigation();
  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Password Changed</Text>
              <Text style={styles.subtitle}>
                This is to confirm that the password for your account has been
                successfully changed.
              </Text>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: 30,
                  paddingTop: 20,
                }}
              >
                <Image
                  source={require('../../assets/images/success.png')}
                  style={{ width: 200, height: 100 }}
                />
              </View>

              <TouchableOpacity
                style={styles.ActionButton}
                onPress={onBackToLogin}
              >
                <View style={styles.ActionContent}>
                  <Text style={styles.ActionText}>Login</Text>
                  <Icon name="arrow-right" color={'#fff'} size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  ActionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  ActionButton: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PasswordChanged;
import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSendOtp?: (username: string) => void;
  onBackToLogin?: () => void;
}

// ✅ Validation schema with Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Must be at least 3 characters'),
});

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onClose,
  onSendOtp,
  onBackToLogin,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modalContainer}>
            {/* Back to login */}
            <TouchableOpacity onPress={onBackToLogin}>
              <Text style={styles.backText}>
                <Icon name="arrow-left" color={'#8B0000'} /> Back to login
              </Text>
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Forgot your Password?</Text>
            <Text style={styles.subtitle}>
              Enter your username to receive an OTP.
            </Text>

            {/* Formik Wrapper */}
            <Formik
              initialValues={{ username: '' }}
              validationSchema={validationSchema}
              onSubmit={values => {
                onSendOtp?.(values.username);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  {/* Username input */}
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    style={[
                      styles.input,
                      touched.username && errors.username
                        ? styles.inputError
                        : null,
                    ]}
                    placeholder="Enter Username"
                    placeholderTextColor="#999"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}

                  {/* Send OTP button */}
                  <TouchableOpacity
                    style={styles.otpButton}
                    onPress={handleSubmit as any}
                  >
                    <View style={styles.otpButtonContent}>
                      <Text style={styles.otpButtonText}>Send OTP</Text>
                      <Icon name="arrow-right" color={'#fff'} size={15} />
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  backText: {
    color: '#8B0000',
    fontWeight: '500',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
  otpButton: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 10,
  },
  otpButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordModal;
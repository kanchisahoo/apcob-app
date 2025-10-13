import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from '@react-native-vector-icons/ant-design';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface VerifyOtpModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
  maskedPhone?: string; // e.g. "+91-XXX XXX 8282"
  onBackToLogin?: () => void;
}

const CELL_COUNT = 6;

// ✅ Validation schema
const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .length(CELL_COUNT, `OTP must be ${CELL_COUNT} digits`),
});

const VerifyOtpModal: React.FC<VerifyOtpModalProps> = ({
  visible,
  onClose,
  onVerify,
  onResend,
  maskedPhone,
  onBackToLogin
}) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!visible) return;

    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, visible]);

  const handleResend = (resetForm: () => void) => {
    resetForm(); // clear OTP field
    setTimer(30); // reset timer
    onResend && onResend();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modalContainer}>
            {/* Back to login */}
            <TouchableOpacity onPress={onClose} style={styles.backContainer}>
                          <AntDesign name="arrowleft" size={20} color="#8B0000" />
                          <Text style={styles.backText}>Back</Text>
                        </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              {maskedPhone}
            </Text>

            {/* Formik wrapper */}
            <Formik
              initialValues={{ otp: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                onVerify && onVerify(values.otp);
              }}
            >
              {({
                handleSubmit,
                values,
                setFieldValue,
                errors,
                touched,
                resetForm,
              }) => {
                const ref = useBlurOnFulfill({
                  value: values.otp,
                  cellCount: CELL_COUNT,
                });
                const [props, getCellOnLayoutHandler] = useClearByFocusCell({
                  value: values.otp,
                  setValue: (v) => setFieldValue('otp', v),
                });

                return (
                  <>
                    {/* OTP Input */}
                    <Text style={styles.label}>Enter Your OTP</Text>
                    <CodeField
                      ref={ref}
                      {...props}
                      value={values.otp}
                      onChangeText={(val) => setFieldValue('otp', val)}
                      cellCount={CELL_COUNT}
                      rootStyle={styles.codeFieldRoot}
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      renderCell={({ index, symbol, isFocused }) => (
                        <View
                          key={index}
                          style={[
                            styles.cellRoot,
                            isFocused && styles.focusCell,
                            touched.otp && errors.otp ? styles.cellError : null,
                          ]}
                          onLayout={getCellOnLayoutHandler(index)}
                        >
                          <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                          </Text>
                        </View>
                      )}
                    />

                    {touched.otp && errors.otp && (
                      <Text style={styles.errorText}>{errors.otp}</Text>
                    )}

                    {/* Expiry Info */}
                    <Text style={styles.expiryText}>
                      OTP will expire in 30 seconds
                    </Text>

                    {/* Verify Button */}
                    <TouchableOpacity
                      style={styles.verifyButton}
                      onPress={handleSubmit as any}
                    >
                      <View style={styles.verifyButtonContent}>
                        <Text style={styles.verifyButtonText}>Verify OTP</Text>
                        <Icon name="arrow-right" color={'#fff'} size={15} />
                      </View>
                    </TouchableOpacity>

                    {/* Resend Section */}
                    {timer > 0 ? (
                      <Text style={styles.resendText}>
                        Resend Code after 00:{timer < 10 ? `0${timer}` : timer}
                      </Text>
                    ) : (
                      <TouchableOpacity
                        style={styles.resendButton}
                        onPress={() => handleResend(resetForm)}
                      >
                        <Text style={styles.resendButtonText}>
                          Generate New OTP
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                );
              }}
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
    fontSize: 16,
    marginLeft: 6,
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
    marginBottom: 10,
  },
  codeFieldRoot: {
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  cellRoot: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 18,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#8B0000',
  },
  cellError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
  expiryText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
   backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  resendText: {
    textAlign: 'center',
    color: '#8B0000',
    fontWeight: '500',
  },
  resendButton: {
    borderWidth: 1,
    borderColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#8B0000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VerifyOtpModal;
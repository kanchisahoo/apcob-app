import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon, { AntDesign } from '@react-native-vector-icons/ant-design';
import Fontisto from '@react-native-vector-icons/fontisto';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onForgotPassword?: () => void;
  handleLogin: (username: any, password: any) => {};
}

const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  onClose,
  onForgotPassword,
  handleLogin,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    remember: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: false,
    },
    validationSchema,
    onSubmit: values => {
      console.log('Form submitted:', values);
      handleLogin(formik.values.username, formik.values.password);
    },
  });

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Welcome</Text>
              <Text style={styles.subtitle}>Please enter your details.</Text>

              {/* Username */}
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={[
                  styles.input,
                  formik.touched.username && formik.errors.username
                    ? styles.inputError
                    : null,
                ]}
                placeholder="Enter Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
              />
              {formik.touched.username && formik.errors.username && (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
              )}

              {/* Password with eye toggle */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    formik.touched.password && formik.errors.password
                      ? styles.inputError
                      : null,
                  ]}
                  placeholder="Enter Password"
                  secureTextEntry={!showPassword}
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
              {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
              )}

              {/* Remember Me + Forgot Password */}
              <View style={styles.row}>
                <View style={styles.checkBoxView}>
                  <TouchableOpacity
                    onPress={() =>
                      formik.setFieldValue('remember', !formik.values.remember)
                    }
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      {!formik.values.remember ? (
                        <Fontisto
                          name="checkbox-passive"
                          size={20}
                          color="#000"
                        />
                      ) : (
                        <Icon name="check-square" size={23} color="#8B0304" />
                      )}
                      <Text style={styles.remember}>Remember me</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={onForgotPassword}>
                    <Text style={styles.forgot}>Forgot Password</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.otpButton}
                onPress={formik.handleSubmit as any}
              >
                <View style={styles.otpButtonContent}>
                  <Text style={styles.otpButtonText}>Sign In</Text>
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

export default LoginModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
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
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 40,
    marginBottom: 12,
    color: '#000',
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    marginBottom: 0,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkBoxView: {
    flexDirection: 'row',
    width: '94%',
    alignItems: 'center',
    margin: '3%',
    justifyContent: 'space-between',
  },
  remember: {
    marginLeft: 6,
  },
  forgot: {
    color: '#8B0304',
    fontWeight: '500',
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
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
});
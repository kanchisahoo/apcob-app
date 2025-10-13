import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import { Formik } from 'formik';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';
import axios from 'axios';
import { decryptResponse, encryptRequest } from '../HOC/EncryptionDecreyption';
import { useSelector } from 'react-redux';

interface InputProps {
  visible: boolean;
  onClose: () => void;
  onBackToLogin?: () => void;
  onSetData: (value: any) => void;
  handleChangePasswordOtp: (oldPassword: any, newPassword: any) => void;
}



const UpdatePasswordModal: React.FC<InputProps> = ({
  visible,
  onClose,
  onBackToLogin,
  onSetData,
  handleChangePasswordOtp
}) => {
  // ✅ Yup validation schema
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      // .required("Please Enter your Password")
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be at most 50 characters")
      .test(
        "no-spaces",
        "Password should not contain spaces at the beginning or end",
        (val) => (val ? val.trim() === val : true)
      )
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
        "Password must contain at least one special character, one uppercase letter, and one number"
      ).required('Current password is required'),
    newPassword: Yup.string()

      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be at most 50 characters")
      .test(
        "no-spaces",
        "Password should not contain spaces at the beginning or end",
        (val) => (val ? val.trim() === val : true)
      )
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
        "Password must contain at least one special character, one uppercase letter, and one number"
      )
      .required('New password is required'),

    confirmPassword: Yup.string()

      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be at most 50 characters")
      .test(
        "no-spaces",
        "Password should not contain spaces at the beginning or end",
        (val) => (val ? val.trim() === val : true)
      )
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
        "Password must contain at least one special character, one uppercase letter, and one number"
      )
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your new password'),
  });
  const loginToken = useSelector((state: any) => state.login.loginToken)
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={() => { }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={onBackToLogin} style={styles.backContainer}>
              <AntDesign name="arrowleft" size={20} color="#8B0000" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>


            {/* Title + Subtitle */}
            <Text style={styles.title}>Update your password</Text>
            <Text style={styles.subtitle}>
              You need to update your password because this is the first time
              you’re signing in, or because your password has expired.
            </Text>

            {/* Formik Wrapper */}
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleChangePasswordOtp?.(values.currentPassword, values.newPassword);
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
                  {/* Current Password */}
                  <Text style={styles.label}>Current Password</Text>


                  <View
                    style={[
                      styles.inputWrapper,
                      touched.currentPassword && errors.currentPassword ? styles.inputError : null,
                    ]}
                  >
                    <TextInput
                      style={
                        styles.input}
                      placeholder="Enter Current Password"
                      secureTextEntry={!showPassword}
                      onChangeText={handleChange('currentPassword')}
                      onBlur={handleBlur('currentPassword')}
                      value={values.currentPassword}
                    />
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <MaterialCommunityIcons
                        name={showPassword ? "eye" : "eye-off"}
                        size={22}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.currentPassword && errors.currentPassword && (
                    <Text style={styles.errorText}>
                      {errors.currentPassword}
                    </Text>
                  )}


                  {/* New Password */}
                  <Text style={styles.label}>New Password</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      touched.currentPassword && errors.currentPassword ? styles.inputError : null,
                    ]}
                  >
                    <TextInput
                      style={[
                        styles.input,
                        touched.newPassword && errors.newPassword
                          ? styles.inputError
                          : null,
                      ]}
                      placeholder="Enter New Password"
                      secureTextEntry={!showNewPassword}
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      value={values.newPassword}
                    />
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => setShowNewPassword(!showNewPassword)}
                    >
                      <MaterialCommunityIcons
                        name={showNewPassword ? "eye" : "eye-off"}
                        size={22}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.newPassword && errors.newPassword && (
                    <Text style={styles.errorText}>{errors.newPassword}</Text>
                  )}

                  {/* Confirm Password */}
                  <Text style={styles.label}>Confirm Password</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      touched.currentPassword && errors.currentPassword ? styles.inputError : null,
                    ]}
                  >
                    <TextInput
                      style={[
                        styles.input,
                        touched.confirmPassword && errors.confirmPassword
                          ? styles.inputError
                          : null,
                      ]}
                      placeholder="Enter Confirm Password"
                      secureTextEntry={!showConfirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                    />
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <MaterialCommunityIcons
                        name={showConfirmPassword ? "eye" : "eye-off"}
                        size={22}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}

                  {/* Reset Button */}
                  <TouchableOpacity
                    style={styles.ActionButton}
                    onPress={handleSubmit as any}
                  >
                    <View style={styles.ActionContent}>
                      <Text style={styles.ActionText}>Reset Password</Text>
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
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  backText: {
    color: '#8B0000',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 6,
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  iconWrapper: {
    paddingHorizontal: 4,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    height: 42,
    borderColor: "#ccc"
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
  ActionButton: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  ActionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UpdatePasswordModal;
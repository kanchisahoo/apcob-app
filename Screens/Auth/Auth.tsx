import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

const MPIN_LENGTH = 6;
const { height, width } = Dimensions.get('window')

const Auth: React.FC = () => {
  const navigator = useNavigation();
  const [step, setStep] = useState<'login' | 'mpin'>('login');
  const [mpin, setMpin] = useState('');

  const ref = useBlurOnFulfill({ value: mpin, cellCount: MPIN_LENGTH });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: mpin,
    setValue: setMpin,
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('User Name is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: values => {
      console.log('Form Submitted', values);
      setStep('mpin');
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/loginImage.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.box}>
        <Text style={styles.title}>
          {step === 'login' ? 'Sign in to begin' : 'MPIN Verification'}
        </Text>

        {/* --- Login Form --- */}
        {step === 'login' && (
          <>
            <Text style={{ marginBottom: 8 }}>User Name</Text>
            <TextInput
              style={[
                styles.input,
                formik.touched.userName && formik.errors.userName
                  ? { borderColor: 'red' }
                  : {},
              ]}
              placeholder="Enter User Name"
              keyboardType="default"
              maxLength={10}
              value={formik.values.userName}
              onChangeText={formik.handleChange('userName')}
              onBlur={formik.handleBlur('userName')}
            />
            {formik.touched.userName && formik.errors.userName && (
              <Text style={{ color: 'red', marginBottom: 8 }}>
                {formik.errors.userName}
              </Text>
            )}
            <Text style={{ marginBottom: 8 }}>Password</Text>
            <TextInput
              style={[
                styles.input,
                formik.touched.password && formik.errors.password
                  ? { borderColor: 'red' }
                  : {},
              ]}
              placeholder="Password"
              secureTextEntry
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={{ color: 'red', marginBottom: 8 }}>
                {formik.errors.password}
              </Text>
            )}
            <TouchableOpacity>
              <Text style={{ color: '#1890FF' }}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setStep('mpin')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#2BAE8F', '#15EEA4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        {/* --- MPIN Form --- */}
        {step === 'mpin' && (
          <>
            <Text style={{ marginBottom: 8 }}>
              Please enter the provided MPIN
            </Text>

            <CodeField
              ref={ref}
              {...props}
              value={mpin}
              onChangeText={setMpin}
              cellCount={MPIN_LENGTH}
              rootStyle={styles.mpinContainer}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  style={[styles.mpinInput, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            <TouchableOpacity>
              <Text style={{ color: '#1890FF' }}>Generate MPIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigator.navigate('Tabs')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#2BAE8F', '#15EEA4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Verify MPIN</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  image: { flex: 1, width: '100%' },
  box: {
    bottom: 0,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'left',
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: { color: '#fff', fontSize: 14 },
  mpinInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: { borderColor: '#2BAE8F' },
  cellText: { fontSize: 20, textAlign: 'center' },
  mpinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
});

export default Auth;
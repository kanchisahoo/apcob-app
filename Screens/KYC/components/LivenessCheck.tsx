import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Stepper from './Stepper';
// import liveness from "../../../assets/liveness.png"

const LivenessCheck: React.FC = () => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <Stepper currentStep={3} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>Liveness Check</Text>
          <Text style={styles.subtitle}>
            We will go through a face verification process to prove that you are
            a real human. Your screen will temporarily be set to a 100% for
            better accuracy.
          </Text>
          <Text style={styles.title}>
            Follow these instructions to complete the check
          </Text>
          <Text style={styles.separator}>
            1. Fill your face within the screen.{'\n'}
            2. Make sure that your face is not covered with sunglasses or a
            mask.
            {'\n'}
            3. Move to a well lit place that is not in direct sunlight.
          </Text>

          <Image
            source={require('../../../assets/images/liveness.png')}
            style={styles.image}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => navigator.navigate('BasicInfo')}
      >
        <Text style={styles.startBtnText}>Proceed to Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LivenessCheck;

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
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    marginTop: 10,
  },
  separator: {
    fontSize: 14,
    color: '#666',
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
  image: {
    width: '100%',
    resizeMode: 'contain',
    marginTop: 10,
  },
});

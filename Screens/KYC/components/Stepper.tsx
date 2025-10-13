import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Entypo from '@react-native-vector-icons/entypo';

const steps = [
  'Consent',
  'PAN Verification',
  'Aadhaar Verification',
  'Liveness Check',
  'Basic Information',
];

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const offset = currentStep * 150;
      scrollRef.current.scrollTo({ x: offset, animated: true });
    }
  }, [currentStep]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ minHeight: 50, maxHeight: 70 }}
    >
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <View key={index} style={styles.stepWrapper}>
            <View style={styles.stepContainer}>
              <View
                style={[
                  styles.circle,
                  isCompleted && styles.completedCircle,
                  isCurrent && styles.activeCircle,
                  !isCompleted && !isCurrent && styles.futureCircle,
                ]}
              >
                {isCompleted ? (
                  <Entypo name="check" size={16} color="#028A3B" />
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      isCurrent && styles.activeStepNumber,
                    ]}
                  >
                    {isCurrent ? index + 1 : ''}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.label,
                  (isCompleted || isCurrent) && styles.activeLabel,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
            {index !== steps.length - 1 && (
              <View
                style={[styles.line, index < currentStep && styles.activeLine]}
              />
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 200,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  completedCircle: {
    backgroundColor: '#fff',
    borderColor: '#028A3B',
    borderWidth: 1,
  },
  activeCircle: {
    backgroundColor: '#028A3B',
  },
  futureCircle: {
    backgroundColor: '#D9D9D9',
  },
  stepNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeStepNumber: {
    color: '#fff',
  },
  label: {
    marginLeft: 8,
    fontSize: 12,
    color: '#999',
  },
  activeLabel: {
    color: '#028A3B',
    fontWeight: 'bold',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeLine: {
    backgroundColor: '#028A3B',
  },
});

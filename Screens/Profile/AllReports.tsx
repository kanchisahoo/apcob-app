import Entypo from '@react-native-vector-icons/entypo';
import Lucide from '@react-native-vector-icons/lucide';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
  Image,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const reports = [
  {
    key: 'AEPS',
    label: 'AEPS',
    iconLib: MaterialIcons,
    iconName: 'fingerprint',
  },
  { key: 'DMT', label: 'DMT', iconLib: Lucide, iconName: 'calculator' },
  {
    key: 'MATM',
    label: 'MATM',
    iconLib: MaterialIcons,
    iconName: 'currency-rupee',
  },
  {
    key: 'Wallet',
    label: 'Wallet',
    iconLib: Lucide,
    iconName: 'wallet-minimal',
  },
  { key: 'BBPS', label: 'BBPS', iconLib: null, iconName: null },
  {
    key: 'Recharge',
    label: 'Recharge',
    iconLib: Lucide,
    iconName: 'smartphone',
  },
  {
    key: 'WalletTopup',
    label: 'Wallet Topup',
    iconLib: Lucide,
    iconName: 'wallet-minimal',
  },
  { key: 'UPI', label: 'UPI', iconLib: MaterialIcons, iconName: 'logout' },
  {
    key: 'Cashout',
    label: 'Cashout',
    iconLib: Lucide,
    iconName: 'wallet-minimal',
  },
  {
    key: 'Commission',
    label: 'Commission',
    iconLib: Entypo,
    iconName: 'line-graph',
  },
  {
    key: 'LivLong',
    label: 'LivLong',
    iconLib: Entypo,
    iconName: 'heart-outlined',
  },
];

const subOptionsMap: Record<string, string[]> = {
  AEPS: ['Unified AEPS', 'Aadhar Pay'],
  WalletTopup: ['Wallet 1', 'Wallet 2', 'Wallet Interchange'],
  DMT: [
    'BENEVERIFICATION',
    'IMPS_FUND_TRANSFER',
    'NEFT_FUND_TRANSFER',
    'SENDER_REGISTRATION_TYPE_1',
  ],
};

const AllReports = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => (prev === key ? null : key));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {reports.map(({ key, label, iconLib: IconLib, iconName }, index) => (
          <View
            key={key}
            style={[styles.card, index === 0 && { borderTopWidth: 1 }]}
          >
            <TouchableOpacity
              onPress={() => toggleAccordion(key)}
              style={styles.cardHeader}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeaderLeft}>
                {key === 'BBPS' ? (
                  <Image
                    source={require('../../assets/images/bbps.png')}
                    style={{ width: 20, height: 20, resizeMode: 'contain' }}
                  />
                ) : key === 'LivLong' ? (
                  <Image
                    source={require('../../assets/images/livlong.png')}
                    style={{ width: 20, height: 20, resizeMode: 'contain' }}
                  />
                ) : (
                  (() => {
                    const Icon = IconLib as React.ElementType;
                    return <Icon name={iconName} size={16} color="#262626" />;
                  })()
                )}
                <Text style={styles.cardTitle}>{label}</Text>
              </View>

              <Entypo
                name={expanded === key ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#555"
              />
            </TouchableOpacity>

            {expanded === key && (
              <View style={styles.subOptionWrapper}>
                <View style={styles.cardBody}>
                  {subOptionsMap[key] ? (
                    subOptionsMap[key].map(option => (
                      <TouchableOpacity key={option} style={styles.subOption}>
                        <Text style={styles.subOptionText}>{option}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.cardText}>
                      {label} report details will appear here.
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllReports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  title: { fontSize: 18, fontWeight: '600' },
  card: {
    borderBottomWidth: 1,
    borderEndWidth: 1,
    borderStartWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cardTitle: { fontSize: 14, color: '#262626' },
  cardBody: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 4,
  },
  cardText: { color: '#444', fontSize: 14 },
  subOptionWrapper: {
    padding: 12,
  },
  subOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  subOptionText: { fontSize: 14, color: '#262626' },
});

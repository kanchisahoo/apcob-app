import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import KycModal from './components/KYCModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import CarouselComponent from './components/Carousel';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Header from '../../utils/HOC/Header';

const HomeScreen: React.FC = () => {
  const [kycOpen, setKycOpen] = useState(false);
  const wallets = [
    { id: '1', name: 'Wallet 1', balance: 1500 },
    { id: '2', name: 'Wallet 2', balance: 4520 },
    { id: '3', name: 'Wallet 3', balance: 980 },
    { id: '4', name: 'Wallet 4', balance: 12000 },
  ];

  useEffect(() => {
    setKycOpen(true);
  }, [])

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={{ paddingVertical: 0, marginVertical: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <CarouselComponent />

        <View style={{ marginVertical: 20 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 3,
              paddingHorizontal: 5,
            }}
            style={{
              borderWidth: 1,
              borderColor: '#DDDDDD',
              borderRadius: 5,
            }}
          >
            <Ionicons name="scan-circle-outline" color="#028A3B" size={20} />
            <Text style={{ marginLeft: 5, color: '#028A3B' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </Text>
          </ScrollView>
        </View>

        <FlatList
          data={wallets}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 25,
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderColor: '#DDDDDD',
                borderWidth: 1,
                borderRadius: 5,
              }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <Ionicons name="wallet-outline" color="grey" size={20} />
                <Text
                  style={{ fontSize: 14, fontWeight: 500, color: '#595959' }}
                >
                  {item.name}
                </Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: 700, color: '#595959' }}>
                {item.balance}
              </Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 10,
          }}
        >
          <MaterialDesignIcons
            name="plus-circle-outline"
            color="#028A3B"
            size={20}
          />
          <Text style={{ fontSize: 14, fontWeight: 500, color: '#028A3B' }}>
            Add Money to Wallet 1
          </Text>
        </TouchableOpacity>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 400, color: '#262626' }}>
            All Product & Services
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>AEPS</Text>
            <Text style={styles.pin}>
              Pin{' '}
              <MaterialDesignIcons name="pin-outline" size={15} color="#666" />
            </Text>
          </View>

          <View style={styles.grid}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.item}
              onPress={() => console.log('Balance Enquiry')}
            >
              <View style={styles.iconWrapper}>
                <MaterialDesignIcons
                  name="scale-balance"
                  size={20}
                  color="#333"
                />
              </View>
              <Text style={styles.label}>Balance Enquiry</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.item}
              onPress={() => console.log('Cash Withdrawal')}
            >
              <View style={styles.iconWrapper}>
                <MaterialDesignIcons name="cash" size={20} color="#333" />
              </View>
              <Text style={styles.label}>Cash Withdrawal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.item}
              onPress={() => console.log('Mini Statement')}
            >
              <View style={styles.iconWrapper}>
                <MaterialDesignIcons
                  name="clipboard-list-outline"
                  size={20}
                  color="#333"
                />
              </View>
              <Text style={styles.label}>Mini Statement</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.item}
              onPress={() => console.log('Cash Deposit')}
            >
              <View style={styles.iconWrapper}>
                <MaterialDesignIcons name="cash-plus" size={20} color="#333" />
              </View>
              <Text style={styles.label}>Cash Deposit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.item}
              onPress={() => console.log('Aadhaar Pay')}
            >
              <View style={styles.iconWrapper}>
                <MaterialDesignIcons name="refresh" size={20} color="#333" />
              </View>
              <Text style={styles.label}>Aadhaar Pay</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>DMT</Text>
            <Text style={styles.pin}>
              Pin{' '}
              <MaterialDesignIcons name="pin-outline" size={15} color="#666" />
            </Text>
          </View>

          <View style={styles.grid}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.item}
              onPress={() => console.log('Balance Enquiry')}
            >
              <View style={styles.iconWrapper}>
                <MaterialDesignIcons
                  name="scale-balance"
                  size={20}
                  color="#333"
                />
              </View>
              <Text style={styles.label}>Money Transfer</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>BBPS</Text>
            <Text style={styles.pin}>
              Pin{' '}
              <MaterialDesignIcons name="pin-outline" size={15} color="#666" />
            </Text>
          </View>

          <View
            style={[
              styles.header,
              { display: 'flex', flexDirection: 'column' },
            ]}
          >
            <Text>Popular</Text>
            <View style={styles.grid}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Balance Enquiry')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="scale-balance"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Broadband</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Cash Withdrawal')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons name="cash" size={20} color="#333" />
                </View>
                <Text style={styles.label}>DTH Recharge</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Mobile Postpaid</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              styles.header,
              { display: 'flex', flexDirection: 'column' },
            ]}
          >
            <Text>Home Bills</Text>
            <View style={styles.grid}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Balance Enquiry')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="scale-balance"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Electricity</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Cash Withdrawal')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons name="cash" size={20} color="#333" />
                </View>
                <Text style={styles.label}>GAS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Landline</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Water Bill</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Cable TV</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>LPG Gas</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Fastag</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              styles.header,
              { display: 'flex', flexDirection: 'column' },
            ]}
          >
            <Text>Insurance</Text>
            <View style={styles.grid}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Balance Enquiry')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="scale-balance"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Health Insurance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Cash Withdrawal')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons name="cash" size={20} color="#333" />
                </View>
                <Text style={styles.label}>Life Insurance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Insurance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Hospital</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.header,
              {
                display: 'flex',
                flexDirection: 'column',
                borderBottomWidth: 0,
              },
            ]}
          >
            <Text>Financial Bills</Text>
            <View style={styles.grid}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Balance Enquiry')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="scale-balance"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Loan Re-payment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Cash Withdrawal')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons name="cash" size={20} color="#333" />
                </View>
                <Text style={styles.label}>Housing Society</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Education Fees</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Balance Enquiry')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="scale-balance"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Subscription</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Cash Withdrawal')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons name="cash" size={20} color="#333" />
                </View>
                <Text style={styles.label}>Municipality Services</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => console.log('Mini Statement')}
              >
                <View style={styles.iconWrapper}>
                  <MaterialDesignIcons
                    name="clipboard-list-outline"
                    size={20}
                    color="#333"
                  />
                </View>
                <Text style={styles.label}>Municipality Tax</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Recharge & Insurance</Text>
            <Text style={styles.pin}>
              Pin{' '}
              <MaterialDesignIcons name="pin-outline" size={15} color="#666" />
            </Text>
          </View>

          <View style={styles.grid}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.item}
              onPress={() => console.log('Balance Enquiry')}
            >
              <View style={styles.iconWrapper}>
                <MaterialDesignIcons
                  name="scale-balance"
                  size={20}
                  color="#333"
                />
              </View>
              <Text style={styles.label}>Mobile & DTH</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.item}
              onPress={() => console.log('Cash Withdrawal')}
            >
              <View style={styles.iconWrapper}>
                <MaterialDesignIcons name="cash" size={20} color="#333" />
              </View>
              <Text style={styles.label}>LivLong</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* KYC Modal */}
        <KycModal
          visible={kycOpen}
          onClose={() => setKycOpen(false)}
          onStartKyc={() => console.log('KYC start')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  kycButton: {
    marginHorizontal: 40,
  },

  listContainer: {
    marginVertical: 10,
    gap: 10,
  },
  card: {
    borderRadius: 8,
    margin: 16,
    borderWidth: 0.5,
    borderColor: '#BBBBBB',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#BBBBBB',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  pin: {
    fontSize: 14,
    color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  item: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
    marginRight: '3.3%', // small right spacing
  },
  iconWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});

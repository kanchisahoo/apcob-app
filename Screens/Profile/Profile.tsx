import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Ionicons from '@react-native-vector-icons/ionicons';
import Lucide from '@react-native-vector-icons/lucide';
import AntDesign from '@react-native-vector-icons/ant-design';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../../utils/HOC/Avatar';

const Profile: React.FC = () => {
  const navigator = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Avatar source={{ uri: 'https://i.pravatar.cc/300' }} size={60} />
        <View style={{ flex: 1, marginLeft: 25 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', color: '#262626' }}>
            Krishna Das
          </Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#8C8C8C' }}>
            +91 7539422808
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 'auto' }}>
          <Ionicons name="settings-outline" size={20} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderWidth: 0.5,
          borderRadius: 5,
          marginTop: 20,
          borderColor: '#BBB',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigator.navigate('All Reports')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 15,
            borderBottomWidth: 0.5,
            borderColor: '#BBB',
          }}
        >
          <Lucide name="notepad-text" size={20} />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 14,
              fontWeight: '400',
              color: '#262626',
            }}
          >
            All Reports
          </Text>
          <MaterialDesignIcons name="arrow-right" size={20} color="#8C8C8C" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 15,
            borderBottomWidth: 0.5,
            borderColor: '#BBB',
          }}
        >
          <Lucide name="square-user" size={20} />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 14,
              fontWeight: '400',
              color: '#262626',
            }}
          >
            KYC
          </Text>
          <MaterialDesignIcons name="arrow-right" size={20} color="#8C8C8C" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 15,
            borderBottomWidth: 0.5,
            borderColor: '#BBB',
          }}
        >
          <Lucide name="notebook-pen" size={20} />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 14,
              fontWeight: '400',
              color: '#262626',
            }}
          >
            Customization
          </Text>
          <MaterialDesignIcons name="arrow-right" size={20} color="#8C8C8C" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 15,
            borderBottomWidth: 0.5,
            borderColor: '#BBB',
          }}
        >
          <MaterialIcons name="password" size={20} />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 14,
              fontWeight: '400',
              color: '#262626',
            }}
          >
            Change Password
          </Text>
          <MaterialDesignIcons name="arrow-right" size={20} color="#8C8C8C" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 15,
            borderBottomWidth: 0.5,
            borderColor: '#BBB',
          }}
        >
          <Ionicons name="shield-checkmark-outline" size={20} />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 14,
              fontWeight: '400',
              color: '#262626',
            }}
          >
            Privacy Policy
          </Text>
          <MaterialDesignIcons name="arrow-right" size={20} color="#8C8C8C" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 15,
            borderBottomWidth: 0.5,
            borderColor: '#BBB',
          }}
        >
          <AntDesign name="customer-service" size={20} />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 14,
              fontWeight: '400',
              color: '#262626',
            }}
          >
            Help & Support
          </Text>
          <MaterialDesignIcons name="arrow-right" size={20} color="#8C8C8C" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigator.navigate('Auth')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            padding: 15,
          }}
        >
          <MaterialDesignIcons name="logout" size={20} />
          <Text
            style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 14,
              fontWeight: '400',
              color: '#262626',
            }}
          >
            Log out
          </Text>
          <MaterialDesignIcons name="arrow-right" size={20} color="#8C8C8C" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default Profile;

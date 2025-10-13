// Header.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import Avatar from './Avatar';

const Header: React.FC = () => {
  const navigator = useNavigation();
  return (
    <View style={styles.header}>
      {/* Avatar */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigator.navigate('Profile')}
      >
        <Avatar source={{ uri: 'https://i.pravatar.cc/300' }} size={40} />
      </TouchableOpacity>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.title}>Hi, Krishna Das</Text>
        <Text style={styles.subtitle}>Welcome To This App</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button} activeOpacity={0.5}>
          <MaterialDesignIcons
            name="help-circle-outline"
            color="grey"
            size={20}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} activeOpacity={0.5}>
          <Ionicons name="search" color="grey" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} activeOpacity={0.5}>
          <MaterialDesignIcons name="bell-outline" color="grey" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    color: '#595959',
  },
  subtitle: {
    fontSize: 14,
    color: '#262626',
    fontWeight: '500',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 5,
  },
  button: {
    padding: 6,
    borderRadius: 8,
  },
});

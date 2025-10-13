// Avatar.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

type AvatarProps = {
  size?: number; // diameter
  source?: ImageSourcePropType; // image source
  name?: string; // fallback initials
  style?: object;
};

const Avatar: React.FC<AvatarProps> = ({ size = 50, source, name, style }) => {
  const getInitials = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : name ? (
        <Text style={{ color: '#fff', fontSize: size / 2 }}>
          {getInitials(name)}
        </Text>
      ) : (
        <Text style={{ color: '#fff', fontSize: size / 2 }}>?</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Avatar;

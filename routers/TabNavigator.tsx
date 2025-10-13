import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import HomeScreen from "../Screens/Home/HomeScreen";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import DMTUser from "../Screens/DMT/DMTUser";
import { HeaderBackButton } from "@react-navigation/elements";
import AepsServices from "../Screens/AEPS/AepsServices";
const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 60 : 80,
          paddingVertical: 0,
        },
        tabBarActiveTintColor: '#028A3B',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
          tabBarLabel: 'HOME',
        }}
      />
      <Tab.Screen
        name="Aeps"
        component={AepsServices}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="fingerprint" color={color} size={size} />
          ),
          tabBarLabel: 'AePS',
        }}
      />
      <Tab.Screen
        name="Scan"
        component={HomeScreen}
        options={{
          tabBarLabel: () => null,
          tabBarButton: ({ accessibilityState, onPress }) => (
            <TouchableOpacity
              onPress={onPress} // only pass the onPress handler
              style={styles.scanButtonContainer}
              activeOpacity={0.8}
            >
              <View style={styles.scanButton}>
                <MaterialIcons name="qr-code-scanner" color="white" size={28} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Matm"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-atm" color={color} size={size} />
          ),
          tabBarLabel: 'MATM',
        }}
      />
      <Tab.Screen
        name="DMT"
        component={DMTUser}
        options={{
           headerShown: true,
           headerTitleAlign: "center",
            headerLeft: (props: any) => (
     <HeaderBackButton
        {...props}/>
            ),
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons
              name="bank-transfer"
              color={color}
              size={size}
            />
          ),
          tabBarLabel: 'DMT',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  scanButtonContainer: {
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
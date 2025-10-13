import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AepsServices = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#FFFFFF" }}>
            <Text style={{ fontWeight: "500", fontSize: 16, color: "#262626" }}>Services</Text>
            <Text style={{ fontWeight: "400", fontSize: 14, color: "#595959" }}>Select a service which you want to use.</Text>
            <View style={{ padding: 0, borderWidth: 0.7, marginTop: "3%", borderColor: "#8C8C8C" }}>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 0.7, padding: 15, borderColor: "#8C8C8C" }} onPress={() => navigation.navigate("Balance Enquiry" as never)}>
                    <Text style={{ color: "#262626", fontWeight: "400", fontSize: 14 }}>Balance Enquiry</Text>
                    <MaterialIcons name='arrow-forward' size={22} color="#8C8C8C"></MaterialIcons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 0.7, padding: 15, borderColor: "#8C8C8C" }} onPress={() => navigation.navigate("Cash Withdrawl" as never)}>
                    <Text style={{ color: "#262626", fontWeight: "400", fontSize: 14 }}>Cash Withdrawal</Text>
                    <MaterialIcons name='arrow-forward' size={22} color="#8C8C8C"></MaterialIcons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 0.7, padding: 15, borderColor: "#8C8C8C" }} onPress={() => navigation.navigate("Mini Statement" as never)}>
                    <Text style={{ color: "#262626", fontWeight: "400", fontSize: 14 }}>Mini Statement</Text>
                    <MaterialIcons name='arrow-forward' size={22} color="#8C8C8C"></MaterialIcons>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 }} onPress={() => navigation.navigate("Cash Deposit" as never)}>
                    <Text style={{ color: "#262626", fontWeight: "400", fontSize: 14 }}>Cash Deposit</Text>
                    <MaterialIcons name='arrow-forward' size={22} color="#8C8C8C"></MaterialIcons>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AepsServices

const styles = StyleSheet.create({})

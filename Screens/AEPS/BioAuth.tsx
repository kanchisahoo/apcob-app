import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const BioAuth = () => {
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor:"#FFFFFF",flex:1}}>
      <Text style={{ fontSize: 16, fontWeight: "500", color: "#262626", padding: 8 }}>Daily Bio-Authentication DBA</Text>
      <Text style={{ fontSize: 14, fontWeight: "400", color: "#595959", paddingHorizontal: 8 }}>Merchant Need To Do Once Daily</Text>
      <TouchableOpacity style={{ alignSelf: "flex-end", backgroundColor: "#028A3B", alignItems: "center", width: 101, height: 40, borderRadius: 4, justifyContent: "center", marginRight: "5%", marginTop: "4%" }} onPress={() => setVisible(true)}>
        <Text style={{ color: "#FFFFFF" }}>Capture</Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Connect Device</Text>
            <Text style={styles.message}>
              Do You Want To Connect With Bluetooth Device
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.usbButton}>
                <Text style={styles.usbText}>USB</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.yesButton} onPress={() =>{setVisible(false),navigation.navigate("AadhaarDeclaration" as never)}}>
                <Text style={styles.yesText}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default BioAuth

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 309,
    height: 169,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    elevation: 5,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#262626',
  },
  message: {
    fontSize: 14,
    color: '#595959',
    marginVertical: 10,
    fontWeight: "400"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  usbButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
  },
  usbText: {
    color: '#595959',
    fontWeight: '400',
    fontSize:14
  },
  yesButton: {
    backgroundColor: '#028A3B', 
    borderRadius: 4,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  yesText: {
    color: '#fff',
    fontWeight: '400',
    fontSize:14
  },
})
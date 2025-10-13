import React from 'react';
import {
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: ()=> void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onLogout,
}) => {
  return (
        <Modal
          transparent
          visible={visible}
          animationType="fade"
          onRequestClose={() => onClose}
        >
          <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
            <View style={{
              margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        // padding: '5%',
        height: '30%',
        alignItems: 'center',
        shadowColor: '#000',
        justifyContent:'center',
        shadowOffset: {
          width: 0,
          height: 2,
        },
            }}>
              <ImageBackground
                    source={require("../../assets/images/background.png")}
                    resizeMode="cover"
                    style={{flex: 1,width: '100%', alignItems: 'center'}}>
              {/* <TouchableOpacity
                style={{ position: 'absolute', right: 20, top: 15 }}
                onPress={() => onClose}
              >
                <MaterialCommunityIcons name='close' color='#000' size={20} />
              </TouchableOpacity> */}
    
              {/* <Image source={imagePath.logoutImage} style={{ height: 210, width: 210 }} /> */}
    
              <Text style={{ color: '#1D242D', fontSize: 20, fontWeight: '400', textAlign: 'center', top: '30%' }}>
                Are you sure you want to logout ?
              </Text>
              <TouchableOpacity style={{
                backgroundColor: '#8B0304', width: '95%', height: 44,
                  marginVertical: 10, borderWidth: 1, borderColor: '#000',
                  position: 'absolute', bottom: 50, justifyContent: 'center'
              }} onPress={onLogout}>
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 16, textAlign: 'center'}}>
                  Log Out
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                backgroundColor: '#ffffff', width: '95%', height: 44,
                  borderColor: '#8B0304', borderWidth: 1,
                  position: 'absolute', bottom: 10, justifyContent: 'center'
              }}
              onPress={onClose}>
                <Text style={{color: '#8B0304', fontWeight: '500', fontSize: 16, textAlign: 'center'}}>
                  Cancel
                </Text>
              </TouchableOpacity>
              {/* <CustomButton
                round={false}
                btnStyle={{
                  backgroundColor: '#8B0304', width: '95%', height: 44,
                  marginVertical: 10, borderWidth: 1, borderColor: '#000',
                  position: 'absolute',
                }}
                btnText='Log Out'
                btnTextStyle={{ color: '#fff', fontWeight: '500', fontSize: 16 }}
                onPress={handleLogout}
              /> */}
    
              {/* <CustomButton
                round={false}
                btnStyle={{
                  ,
                }}
                btnText='Keep me Logged In'
                btnTextStyle={{ color: '#1D242D', fontWeight: '500', fontSize: 16 }}
                onPress={handleKeepLoggedIn}
              /> */}
              </ImageBackground>
            </View>
          </View>
        </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000'
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000'
  },
  idText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  doneButton: {
    backgroundColor: '#002855',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#002855',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#002855',
    fontSize: 16,
  },
  buttonText1: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomModal;

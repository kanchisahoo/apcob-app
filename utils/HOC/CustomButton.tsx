import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import {moderateScale} from 'react-native-size-matters' ;
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../theme';


interface CustomButton {
  onPress?: any;
  btnStyle?: any;
  btnText?: string;
  img?: any;
  imgRight?: any;
  btnTextStyle?: any;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  iconStyle?: any;
  imgStyle?: any;
  imgRightStyle?: any;
  round: boolean;
}

const initialProps: CustomButton = {
  onPress: () => { },
  btnStyle: {},
  btnText: '',
  img: null,
  imgRight: null,
  btnTextStyle: {},
  icon: '',
  iconSize: 12,
  iconColor: theme.colors.white,
  iconStyle: {},
  imgStyle: {},
  imgRightStyle: {},
  round: false,
};

const CustomButton = (props = initialProps) => {
  const buttonStyle = () => {
    const style = { ...styles.btnStyle };
    const extraStyle = { ...props.btnStyle };
    const roundStyle = props.round ? { ...styles.btnRound } : {};
    return { ...style, ...extraStyle, ...roundStyle };
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={buttonStyle()}>
      <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
        {props.btnText === "HOME"|| props.btnText === "PREVIOUS" ?
          (
            <>
              <AntDesign name="arrowleft" size={25} color="white" style={{ fontWeight: "bold",right: props.btnText === "HOME" ? "20%" : "10%" ,alignSelf:"flex-start"}} />
              <Text style={{ ...styles.buttonText, ...props.btnTextStyle }}>
                {props.btnText}
              </Text>
            </>
          ) : (
            <>
              <Text style={{ ...styles.buttonText, ...props.btnTextStyle }}>
                {props.btnText}
              </Text>
              {/* <AntDesign name="arrowright" size={25} color="white" style={{ fontWeight: "bold",left:"20%" }} /> */}
            </>
          )

        }


      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnRound: {
    // borderRadius: 10,
  },
  buttonText: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.white,
    // fontWeight: 'bold',
    fontFamily: 'Nunito-ExtraBold',
  },
});

export default CustomButton;

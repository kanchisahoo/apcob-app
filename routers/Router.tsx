import { HeaderBackButton } from "@react-navigation/elements";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "../redux/store";
import BioAuth from "../Screens/AEPS/BioAuth";
import AadhaarDeclaration from "../Screens/AEPS/AadhaarDeclaration";
import AepsServices from "../Screens/AEPS/AepsServices";
import BalanceEnquiry from "../Screens/AEPS/BalanceEnquiry";
import MiniStatement from "../Screens/AEPS/MiniStatement";
import CashDeposit from "../Screens/AEPS/CashDeposit";
import CashWithdrawl from "../Screens/AEPS/CashWithdrawl";
import TransactionSummary from "../Screens/AEPS/TransactionSummary";
import Auth from "../Screens/Auth/Auth";
import { TabNavigator } from "./TabNavigator";
import KycScreen from "../Screens/KYC/KYCScreen";
import VerifyMail from "../Screens/KYC/components/VerifyMail";
import CompleteKYC from "../Screens/KYC/components/CompleteKYC";
import UserConsentDeclaration from "../Screens/KYC/components/UserConsentDeclaration";
import PANVerification from "../Screens/KYC/components/PANVerification";
import AadhaarVerification from "../Screens/KYC/components/AadhaarVerification";
import LivenessCheck from "../Screens/KYC/components/LivenessCheck";
import BasicInfo from "../Screens/KYC/components/BasicInfo";
import Profile from "../Screens/Profile/Profile";
import AllReports from "../Screens/Profile/AllReports";
import DMTUser from "../Screens/DMT/DMTUser";
import BeneficiaryList from "../Screens/DMT/BeneficiaryList";
import BeneficiaryDetails from "../Screens/DMT/BeneficiaryDetails";




const Router = () => {
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3300);
  }, []);



  let persistor = persistStore(store);
  const RootStack = createNativeStackNavigator();
  // const screenOptionStyle = {
  //   // headerStyle: {
  //   //   backgroundColor: "#13565F",

  //   // },
  //   // headerTintColor: "white",
  //   headerBackTitle: "Back",
  //   // backgroundColor: "#f7f6f6",

  //   headerLeft: (props: any) => (
  //     <HeaderBackButton
  //       {...props}
  //        onPress={() => props.canGoBack && props.onPress?.()}
  //       style={{
  //         // marginLeft: -3,
  //         marginRight: Platform.OS === "android" ? 5 : 0,
  //         marginLeft: Platform.OS === "android" ? -2 : 0,
  //       }}
  //     />
  //   ),
  // };
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator>
          {/* {showSplashScreen ? (
            <RootStack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
          ) : null} */}
           <RootStack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Kyc"
            component={KycScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="KycVerifyMail"
            component={VerifyMail}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="CompleteKYC"
            component={CompleteKYC}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="UserConsentDeclaration"
            component={UserConsentDeclaration}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="PANVerification"
            component={PANVerification}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="AadhaarVerification"
            component={AadhaarVerification}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="LivenessCheck"
            component={LivenessCheck}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="BasicInfo"
            component={BasicInfo}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: true }}
          />
          <RootStack.Screen
            name="All Reports"
            component={AllReports}
            options={{ headerShown: true }}
          />
          <RootStack.Screen name="BioAuth"
            component={BioAuth}
            options={{ headerShown: true, title: 'AEPS', }} />

          <RootStack.Screen name="AadhaarDeclaration"
            component={AadhaarDeclaration}
            options={{ headerShown: true, title: 'AEPS', }} />
          <RootStack.Screen name="AepsServices"
            component={AepsServices}
            options={{ headerShown: true, title: 'AEPS', }} />
          <RootStack.Screen name="Balance Enquiry"
            component={BalanceEnquiry}
            options={{ headerShown: true, title: 'Balance Enquiry', }} />
          <RootStack.Screen name="Cash Deposit"
            component={CashDeposit}
            options={{ headerShown: true, title: 'Cash Deposit', }} />
          <RootStack.Screen name="Cash Withdrawl"
            component={CashWithdrawl}
            options={{ headerShown: true, title: 'Cash Withdrawl', }} />
          <RootStack.Screen name="Mini Statement"
            component={MiniStatement}
            options={{ headerShown: true, title: 'Mini Statement', }} />
          <RootStack.Screen name="TransactionSummary"
            component={TransactionSummary}
            options={{ headerShown: true, title: 'Transaction Summary', }} />
             <RootStack.Screen name="DMTUser"
            component={DMTUser}
            options={{ headerShown: true, title: 'DMT', }} />
           <RootStack.Screen name="BeneficiaryList"
            component={BeneficiaryList}
            options={{ headerShown: true, title: 'DMT', }} />
             <RootStack.Screen name="BeneficiaryDetails"
            component={BeneficiaryDetails}
            options={{ headerShown: true, title: 'DMT', }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Router;

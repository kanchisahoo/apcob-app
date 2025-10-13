// Define your route parameter list here. This makes it type-safe.
export type RootStackParamList = {
  Auth: undefined;
  Tabs: undefined;
  Kyc: undefined;
  KycVerifyMail: undefined;
  CompleteKYC: undefined;
  UserConsentDeclaration: undefined;
  PANVerification: undefined;
  AadhaarVerification: undefined;
  LivenessCheck: undefined;
  BasicInfo: undefined;
  Profile: undefined;
  "All Reports":undefined;
};

// This declaration merges your type with the React Navigation library's types.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

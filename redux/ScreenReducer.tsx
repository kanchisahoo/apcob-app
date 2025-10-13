import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardResponse: {},
  wallet:{}
};

const ScreenReducer = createSlice({
  name: "screen",
  initialState,
  reducers: {
  
    setDashboardResponse: (state, { payload }) => {
      if ( payload== null) {
        state = initialState;
      } else {
        state.dashboardResponse = payload;
      }
    },
     setWalletResponse: (state, { payload }) => {
      if ( payload== null) {
        state = initialState;
      } else {
        state.wallet = payload;
      }
    },
  },
});
const { reducer, actions } = ScreenReducer;
export const {
  setDashboardResponse,
  setWalletResponse
} = actions;


export const dashboardResponse = (state: any) => state.screen.dashboardResponse;
export const wallet = (state: any) => state.screen.wallet;
export default reducer;

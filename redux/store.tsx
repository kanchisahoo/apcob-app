import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { combineReducers } from "redux";
import loginReducer from "./LoginReducer"

import { persistReducer } from "redux-persist";


const reducers = combineReducers({
  login: loginReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,

  //   blacklist:['course'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,  // ✅ correct
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["register"],
      },
    }),
});



// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// import loginReducer from "./LoginReducer"

// // Logger middleware setup
// const logger = createLogger({
//   duration: false,
//   timestamp: true,
//   level: 'log',
//   logErrors: true,
  
// });

// export const store = configureStore({
//   reducer: loginReducer,
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware({
//         thunk: true // This keeps the default redux-thunk
//     }).concat(logger), // Only add logger, since redux-thunk is already included by default
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


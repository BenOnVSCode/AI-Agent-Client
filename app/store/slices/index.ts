import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:StoreState = {
  name: null,
  email: null,
  role: null,
  callsPage: 1
} 

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: { 
    changeInfo(state, action:PayloadAction<{email: string, name: string, role: string}>){
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    changePage(state, action:PayloadAction<number>){
      state.callsPage = action.payload; 
    }
  },
});

export const { changeInfo, changePage } = stateSlice.actions;
export default stateSlice;
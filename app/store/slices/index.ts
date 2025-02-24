import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:StoreState = {
  id: null,
  name: null,
  email: null,
  role: null,
  callsPage: 1,
  callsFilter: [],
} 

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: { 
    changeInfo(state, action:PayloadAction<{email: string, name: string, role: string, id: number}>){
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
    changePage(state, action:PayloadAction<number>){
      state.callsPage = action.payload; 
    },
    changeCallsFilter(state, action:PayloadAction<number[]>){
      state.callsFilter = action.payload;
    }
  },
});

export const { changeInfo, changePage, changeCallsFilter } = stateSlice.actions;
export default stateSlice;
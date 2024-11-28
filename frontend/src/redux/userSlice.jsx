import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Initial state
    isLoading:false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Update user state
    },
    setLoading: (state,action) =>{
        state.isLoading= action.payload
    }
  },
});

export const { setUser,setLoading } = userSlice.actions;
export default userSlice.reducer;

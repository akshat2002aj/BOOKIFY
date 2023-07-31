import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    user:{}
}
const AuthSlice = createSlice({
    name:"Auth",
    initialState,
    reducers:{
        logIn:(state)=>{
            state.isLoggedIn = true;
        },
        logOut:(state)=>{
            state.isLoggedIn = false;
        }
    }
})

export const { logIn, logOut} = AuthSlice.actions
export default AuthSlice.reducer;
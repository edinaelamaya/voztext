import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    connected: false, 
    user: {},
}


const sliceReducers = createSlice({
    name: 'ige',
    initialState,
    reducers:{
        login: (state, action) => {          
            state.connected= action.payload.connected
            state.user= action.payload.user
          },
    }
})


export const { login } = sliceReducers.actions
export default sliceReducers.reducer
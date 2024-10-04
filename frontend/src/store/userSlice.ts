import { createSlice } from "@reduxjs/toolkit";


// TODO: Crear slice y respectivo hook para los usuarios (a lo mejor dsp habria que crear otro para los usuarios de un grupo)

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
    },
    reducers: {
        setUsers(state, { payload }) {
            state.users = payload;
        }
    }
});


export const { setUsers } = userSlice.actions;
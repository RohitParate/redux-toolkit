const createSlice = require('@reduxjs/toolkit').createSlice
//reduxjs/toolkit provides createAsyncThunk to creation and dispatching async functions 
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk
const axios = require('axios');

const initialState = {
    loading: false,
    data: [],
    error: ''
}

//createAsync thunk accepts 2 parameters 1. action name 2. callback function that creates the payload
//createAsyncThunk it'll automatically dispatch lifecycle actions based on returned promise
//i.e. this action type will generate pending, fulfilled and rejected action types
const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.data.map(user => user.id))
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchUsers.pending, state => {state.loading = true})
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload,
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false,
            state.data = [],
            state.error = action.error.message
        })
    }
})

module.exports = userSlice.reducer
module.exports.fetchUsers = fetchUsers
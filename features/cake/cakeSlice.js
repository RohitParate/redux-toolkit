const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    noOfCakes : 10
}

const cakeSlice = createSlice({
    name : 'cake',
    initialState,
    reducers : {
        //here we can directly update the state as reduc-toolkit under the hood use immer to update the state
        ordered : (state) => {
            state.noOfCakes--
        },
        restocked : (state, action) => {
            state.noOfCakes += action.payload
        }
    }
})

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions

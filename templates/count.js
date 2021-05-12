import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    count:0
}

export const CountSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increase:(state)=>{
            state.count+=1
        },
        decrease:(state)=>{
            state.count -=1
        },
        increateByAmount:(state,action)=>{
            state.count += action.payload
        }
    }
})


export const {increase,decrease,increateByAmount} = CountSlice.actions

export const selectCount = (state)=>state.counter.count


export default CountSlice.reducer
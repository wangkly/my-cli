import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'

interface CounterState{
    count:number
}
const initialState:CounterState = {
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
        increateByAmount:(state,action:PayloadAction<number>)=>{
            state.count += action.payload
        }
    }
})


export const {increase,decrease,increateByAmount} = CountSlice.actions

export const selectCount = (state:RootState)=>state.counter.count


export default CountSlice.reducer
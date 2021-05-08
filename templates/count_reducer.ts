import produce from 'immer'
import { AnyAction } from 'redux'
interface CounterState{
    count:number
}
const initialState:CounterState = {
    count:0
}

export default function countReducer(state=initialState,action:AnyAction){
    switch(action.type){
        case 'increase':
            return produce(state,(draftState:CounterState)=>{
                draftState.count += 1
            })
        case 'decrease':
            return produce(state,(draftState:CounterState)=>{
                draftState.count -= 1
            })
        default:
            return state
    }
}
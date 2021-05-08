import produce from 'immer'
const initialState = {
    count:0
}

export default function countReducer(state=initialState,action){
    switch(action.type){
        case 'increase':
            return produce(state,(draftState)=>{
                draftState.count += 1
            })
        case 'decrease':
            return produce(state,(draftState)=>{
                draftState.count -= 1
            })
        default:
            return state
    }
}
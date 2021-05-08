import {call,put,takeEvery} from 'redux-saga/effects'

interface Action{
    type:string,
    payload?:any
}

function *countLog(action:Action){
    console.log(`count changed value:${action.payload.value}`)
    yield put({...action,type:'increase'})
}


function * mySaga(){
    yield takeEvery("COUNT_CHANGE",countLog)

}

export default mySaga;
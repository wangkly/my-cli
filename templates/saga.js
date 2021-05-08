import {call,put,takeEvery} from 'redux-saga/effects'

function *countLog(action){
    console.log(`count changed value:${action.payload.value}`)
    yield put({...action,type:'increase'})
}


function * mySaga(){
    yield takeEvery("COUNT_CHANGE",countLog)

}

export default mySaga;
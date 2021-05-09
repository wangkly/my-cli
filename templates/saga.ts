import {call,put,takeEvery} from 'redux-saga/effects'

interface Action{
    type:string,
    payload?:any
}

function *countLog(action:Action){
    console.log(`count changed action:${action}`)
    yield put({...action,type:'increase'})
}


function * mySaga(){
    yield takeEvery("COUNT_CHANGE",countLog)

}

export default mySaga;
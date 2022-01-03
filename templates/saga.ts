import {put,takeEvery} from 'redux-saga/effects'
import  type {AnyAction} from 'redux'

function *countLog(action:AnyAction){
    console.log(`count changed action:${action}`)
    yield put({...action,type:'increase'})
}


function * mySaga(){
    yield takeEvery("COUNT_CHANGE",countLog)

}

export default mySaga;
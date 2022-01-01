import {call,put,takeEvery} from 'redux-saga/effects'
import {increase} from './reducers/count'
import  type {AnyAction} from 'redux'


function *countLog(action:AnyAction){
    console.log(`count changed action:${action}`)
    // yield put({type:'counter/increase'})
    yield put(increase())
}


function * mySaga(){
    yield takeEvery("COUNT_CHANGE",countLog)

}

export default mySaga;
import {call,put,takeEvery} from 'redux-saga/effects'
import {increase} from './reducers/count'
interface Action{
    type:string,
    payload?:any
}

function *countLog(action:Action){
    console.log(`count changed action:${action}`)
    // yield put({type:'counter/increase'})
    yield put(increase())
}


function * mySaga(){
    yield takeEvery("COUNT_CHANGE",countLog)

}

export default mySaga;
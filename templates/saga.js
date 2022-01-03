import {put,takeEvery} from 'redux-saga/effects'

function *countLog(action){
    console.log(`count changed action:${action}`)
    yield put({...action,type:'increase'})
}


function * mySaga(){
    yield takeEvery("COUNT_CHANGE",countLog)

}

export default mySaga;
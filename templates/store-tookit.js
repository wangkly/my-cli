import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import CountReducer from './reducers/count'
import mySaga from './saga'

const sageMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer:{
        counter:CountReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([
        sageMiddleware
    ]),
    devTools: process.env.NODE_ENV !== 'production',
})

sageMiddleware.run(mySaga)

export default store;
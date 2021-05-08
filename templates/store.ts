import {createStore, applyMiddleware,combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import mySaga from './saga'


import countReducer from './reducers/count_reducer';

export interface RootState {
    countReducer: any
}

const rootReducer = combineReducers({
    countReducer,
})

const sageMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, 
                                composeWithDevTools(
                                    applyMiddleware(sageMiddleware)
                                    ));


sageMiddleware.run(mySaga)

export default store;
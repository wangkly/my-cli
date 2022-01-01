import {useSelector,useDispatch,TypedUseSelectorHook} from 'react-redux'
import type {Dispatch} from 'redux'
import type {RootState,AppDispatch} from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = ():Dispatch<any> => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
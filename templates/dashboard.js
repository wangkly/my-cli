import React from 'react'
import {useImmer} from 'use-immer'
import {useDispatch,useSelector} from 'react-redux'

const Dashboard= ()=> {

    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

    const [state,updateState] = useImmer({
        value:''
    })

    const handleTextChange = (e) => {
        updateState((draft) => {
            draft.value = e.target.value;
        });
    };

    return(
        <div>
            <div>
                <h1>{count}</h1>
                <button onClick={()=>dispatch({type:'COUNT_CHANGE'})}>+</button>
            </div>

            <h2>{state.value}</h2>
            <input onChange={handleTextChange} />
        </div>
    )
}

export default Dashboard
import React from 'react'
import {HashRouter as Router ,Route,Switch} from 'react-router-dom'
import ReactDom from 'react-dom'
import Dashboard from './dashboard'
import {createHashHistory} from 'history'
import '../style/index.less'

const hasHistory = createHashHistory()

export default class App extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <Router history={hasHistory}>
                <Switch>
                    <Route exact path="/" component={Dashboard}></Route>
                  </Switch>
            </Router>

        )
    }
}


ReactDom.render(<App />,document.getElementById('root'))

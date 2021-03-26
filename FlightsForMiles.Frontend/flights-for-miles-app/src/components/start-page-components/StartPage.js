import React from 'react'
import { Redirect, Switch } from 'react-router'
import Header from './Header'
import Info from './Info'
import Pictures from './Pictures'

function StartPage() {
    return (
        <div>
            <Header /> 
            <Switch>
                <Redirect to="/"/>
                ...
            </Switch>
            <Info />
            <Pictures />
        </div>
    )
}

export default StartPage

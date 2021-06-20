import React from 'react'
import { Route, Switch } from 'react-router'
import AirlinesAndFlights from './airline-and-flights/AirlinesAndFlights'
import Header from './Header'
import StartPageInformations from './StartPageInformations'

function StartPage() {
    return (
        <div>
            <Header /> 
            <Switch>
                <Route exact path="/" component={StartPageInformations}/>
                <Route exact path="/airlineReview" component={AirlinesAndFlights}/>
            </Switch>
           {/* <Info />
            <Pictures />
           <QuestionMark />*/}
        </div>
    )
}

export default StartPage

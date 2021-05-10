import React from 'react'
import { Route, Switch } from 'react-router'
import Header from '../avio-admin-components/Header'
import AirlineReview from './airline-review/AirlineReview'
import AvioAdminProfile from './avio-admin-profile/AvioAdminProfile'
import ConfigDestionation from './config-destination/ConfigDestionation'
import ConfigFlight from './config-flight/ConfigFlight'
import ConfigSeats from './config-seats/ConfigSeats'
import HelpConfiguration from './help-configuration/HelpConfiguration'

function AvioAdmin() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/avio/:username/configD" component={ConfigDestionation} />
                <Route exact path="/avio/:username/configF" component={ConfigFlight} />
                <Route exact path="/avio/:username/configS" component={ConfigSeats} />
                <Route exact path="/avio/:username/airlineReview" component={AirlineReview} />
                <Route exact path="/avio/:username/configH" component={HelpConfiguration} />
                <Route exact path="/avio/:username/avioProfile" component={AvioAdminProfile} />
            </Switch>
        </div>
    )
}

export default AvioAdmin

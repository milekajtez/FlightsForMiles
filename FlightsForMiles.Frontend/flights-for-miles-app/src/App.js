import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import StartPage from './components/start-page-components/StartPage';
import RegularUser from './components/registered-user-components/regular-user-components/RegularUser'
import SystemAdmin from './components/registered-user-components/system-admin-components/SystemAdmin'
import AvioAdmin from './components/registered-user-components/avio-admin-components/AvioAdmin'
import ConfirmRegYes from './components/confirm-pages-component/ConfirmRegYes';
import ConfirmRegNo from './components/confirm-pages-component/ConfirmRegNo';
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminRegistration from './components/registered-user-components/system-admin-components/admin-registration/AdminRegistration';
import AirlineRegistration from './components/registered-user-components/system-admin-components/airline-registration/AirlineRegistration';
import DiscountSettings from './components/registered-user-components/system-admin-components/discount-settings/DiscountSettings';

function App() {
  return (
    <Provider store={store}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/confirmRegYes/:username?" component={ConfirmRegYes} />
            <Route exact path="/confirmRegNo" component={ConfirmRegNo} />
            <Route exact path="/system/:username/:option" component={SystemAdmin} />
            <Route exact path="/avio/:username" component={AvioAdmin} />
            <Route exact path="/regular/:username" component={RegularUser} />
            <Redirect to="/"/>
          </Switch>
        </div>
    </Provider>
  );
}

export default App;

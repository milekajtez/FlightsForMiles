import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import StartPage from './components/start-page-components/StartPage';
import RegisteredUser from './components/registered-user-components/RegisteredUser';
import ConfirmRegYes from './components/confirm-pages-component/ConfirmRegYes';
import ConfirmRegNo from './components/confirm-pages-component/ConfirmRegNo';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={StartPage}/>
        <Route exact path="/confirmRegYes" component={ConfirmRegYes}/>
        <Route exact path="/confirmRegNo" component={ConfirmRegNo}/>
        <Route exact path="/:username?" component={RegisteredUser}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}

export default App;

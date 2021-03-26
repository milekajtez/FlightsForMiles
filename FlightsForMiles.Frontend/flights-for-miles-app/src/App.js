import './App.css';
import Main from './components/Main';
import { Switch, Route } from 'react-router-dom'
import SystemAdmin from './components/system-admin-components/SystemAdmin';
import AvioAdmin from './components/avio-admin-components/AvioAdmin';
import RegularUser from './components/regular-user-components/RegularUser';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Main}/>
        <Route path="/systemAdmin/:username?" component={SystemAdmin}/>
        <Route path="/avioAdmin/:username?" component={AvioAdmin}/>
        <Route path="/regularUser/:username?" component={RegularUser}/>
      </Switch>
    </div>
  );
}

export default App;

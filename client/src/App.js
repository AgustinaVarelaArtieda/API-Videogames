import './App.css';

import {Route, Switch} from 'react-router-dom'

import landingPage from './components/Landing Page/landingPage';
import { Home } from './components/Home Page/homePage';

function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={landingPage}/>
          <Route path='/home' component={Home}/>
        </Switch>
      </div>
  );
}

export default App;

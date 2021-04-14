import './App.css';
import {Home} from './Home';
import {Lenda} from './Lenda';
import {Studenti} from './Studenti';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
      -Fakulteti-
     </h3>
     <Navigation/>
     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/Lenda' component={Lenda}/>
       <Route path='/Studenti' component={Studenti}/>
     </Switch>

     </div>
     </BrowserRouter>
  );
}

export default App;

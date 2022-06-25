import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Form from './vistas/Form';
import Home from './vistas/Home';
import LandingPage from './vistas/LandingPage'
import NavBar from './vistas/NavBar';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <NavBar/>
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/create' component={Form}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

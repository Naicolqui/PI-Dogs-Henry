import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Form from './vistas/Form';
import Home from './vistas/Home';
import LandingPage from './vistas/LandingPage'
import NavBar from './vistas/NavBar';
import Detail from './vistas/Detail';
import Footer from './vistas/Footer';
import ErrorView from './vistas/ErrorView';
// import SearchBar from './components/SearchBar';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <SearchBar/> */}
        <NavBar/>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/home' component={Home}/>
          <Route path='/create' component={Form}/>
          <Route path='/details/:id' component={Detail}/>
          <Route path='*' component={ErrorView}/>
        </Switch>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

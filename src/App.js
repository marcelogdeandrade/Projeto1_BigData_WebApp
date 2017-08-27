import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import ListSpecies from './components/ListSpecies'
import AddSpecie from './components/AddSpecie'
import './App.css';
import 'semantic-ui-css/semantic.min.css'

const App = () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/list_species" component={ListSpecies} />
    <Route exact path="/add_specie" component={AddSpecie} />
  </Switch>;

export default App;

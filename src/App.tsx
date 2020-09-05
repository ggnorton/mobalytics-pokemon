import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PokemonsList from "./pages/PokemonsList/PokemonsList";
import PokemonProfile from "./pages/PokemonProfile/PokemonProfile";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route path="/:id">
            <PokemonProfile />
          </Route>
          <Route exact path="/">
            <PokemonsList />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

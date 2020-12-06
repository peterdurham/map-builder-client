import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import "mapbox-gl/dist/mapbox-gl.css";

import Layout from "./components/layout";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import MapView from './components/map/mapView'
import ShareMapView from './components/shareMap/shareMapView'

function App() {


  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/map/:id">
            <MapView />
          </Route>
          <Route path="/share/:id">
            <ShareMapView />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

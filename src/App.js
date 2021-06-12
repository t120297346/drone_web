import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Image_map from "./pages/Image_map";
import Home from "./pages/Home";
import Image_upload from "./pages/Image_upload";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";

function App() {

  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/map" component={Image_map}/>
          <Route path="/upload" component={Image_upload}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;


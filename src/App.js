import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Image_map from "./pages/Image_map";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";

function App() {

  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/map" component={Image_map}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;


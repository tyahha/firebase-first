import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import config from "../config/firebase-config";
import { Header } from "./Header";
import { VideoUpload } from "./VideoUpload";
import { VideoFeed } from "./VideoFeed";

firebase.initializeApp(config);
firebase.firestore().settings({});

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <VideoFeed />
        </Route>
        <Route path="/upload">
          <VideoUpload />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

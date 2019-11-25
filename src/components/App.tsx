import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import config from "../config/firebase-config";
import { Header } from "./Header";

const App: React.FC = () => {
  React.useEffect(() => {
    firebase.initializeApp(config);
    firebase.firestore().settings({ timestampsInSnapshots: true });
  }, []);

  return <Header />;
};

export default App;

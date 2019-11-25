import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import config from "../config/firebase-config";
import { Header } from "./Header";

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

const App: React.FC = () => {
  return <Header />;
};

export default App;

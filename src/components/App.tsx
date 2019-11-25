import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import config from "../config/firebase-config";

const App: React.FC = () => {
  React.useEffect(() => {
    firebase.initializeApp(config);
    firebase.firestore().settings({ timestampsInSnapshots: true });
  }, []);

  return <div>Hello, World!!!</div>;
};

export default App;

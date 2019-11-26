import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    margin: 10,
    backgroundColor: "white"
  },
  link: {
    textDecoration: "none",
    color: "white"
  }
}));

export const Header = () => {
  const styles = useStyles();
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
        user.displayName && setUserName(user.displayName);
        user.photoURL && setProfilePicUrl(user.photoURL);
      } else {
        setIsLogin(false);
        setUserName("");
        setProfilePicUrl("");
      }
    });
  }, []);

  return (
    <div className={styles.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h3" color="inherit" className={styles.flex}>
            <Link to="/" className={styles.link}>
              Firebase Videos
            </Link>
          </Typography>
          {isLogin ? (
            <div>
              <Button color="inherit" className={styles.button}>
                <Avatar
                  alt="profile image"
                  src={profilePicUrl}
                  className={styles.avatar}
                />
                {userName}
              </Button>
              <Button
                color="inherit"
                className={styles.button}
                onClick={signOut}
              >
                Sign out
              </Button>
              <Button variant="contained" color="default">
                <Link to="/upload" className={styles.link}>
                  Upload
                </Link>
                <CloudUploadIcon className={styles.rightIcon} />
              </Button>
            </div>
          ) : (
            <Button
              color="inherit"
              className={styles.button}
              onClick={googleSignIn}
            >
              Login with Google
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

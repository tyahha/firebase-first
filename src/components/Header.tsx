import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export const Header = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h3" color="inherit" className={styles.flex}>
            Firebase Videos
          </Typography>
          <Button
            color="inherit"
            className={styles.button}
            onClick={() => alert("todo")}
          >
            Login with Google
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

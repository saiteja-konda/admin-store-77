import { CardHeader, withStyles } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import "react-responsive-modal/styles.css";
const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: "#eaeff1",
  },
  Modal: {
    minWidth: 600,
  },
  button: {
    marginTop: "15px",
    color: "white",
    backgroundColor: red[500],
  },
});

function Testmonials(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <CardHeader title="Testmonials " />
          </Grid>
        </div>
      </Paper>
    </main>
  );
}

Testmonials.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Testmonials);

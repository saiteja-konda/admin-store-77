import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from "@material-ui/icons/Search";
import { useStoreActions, useStoreState } from "easy-peasy";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import LatestOrders from "./LatestOrders";

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
});

function Order(props) {
  const { classes } = props;
  const { orders } = useStoreState((store) => store.rox);
  const { getOrders } = useStoreActions((store) => store.rox);

  useEffect(() => {
    getOrders();
  }, [getOrders]);
  const [string, setString] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  function handleSearch() {
    if (string != null) {
      var results = _.filter(orders, function (item) {
        return item.id.toLowerCase().indexOf(string.toLowerCase()) > -1;
      });
    }
    setFilteredData(results);
  }

  const data = string === null || string.length < 3 ? orders : filteredData;
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  value={string}
                  onChange={(e) => {
                    setString(e.target.value);
                    handleSearch();
                  }}
                  placeholder="Search Orders by Order Invoice"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addUser}
                  onClick={handleSearch}
                >
                  Search
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="center">
            Beta Version
          </Typography>

          <LatestOrders orders={data} />
        </div>
      </Paper>
    </main>
  );
}

Order.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Order);

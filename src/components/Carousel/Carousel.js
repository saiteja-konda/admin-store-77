import {
  Button,
  CardHeader,
  Checkbox,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles,
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { useStoreActions, useStoreState } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { WidgetLoader } from "react-cloudinary-upload-widget";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ImageUploader from "../../utils/ImageUploader";
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

function Carousel(props) {
  const { classes } = props;
  const { Promos } = useStoreState((store) => store.rox);
  const { getPromos, getNewPromo, addNewPromo, updatePromo } = useStoreActions(
    (store) => store.rox
  );
  const [open, setOpen] = useState(false);
  useEffect(() => getPromos(), [getPromos]);
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDelete = () => {
    const cleaned = Promos.filter((o) => checked.indexOf(o.asset_id) == -1);
    updatePromo({ cleaned, newArray: { id: "Promos", variants: cleaned } });
  };

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
            <CardHeader title="Promotion Banners" />
          </Grid>
          <Grid container spacing={1}>
            {Promos.map((o) => (
              <Grid key={o.asset_id} item xs={6}>
                <Paper elevation={0}>
                  <img
                    src={o.url}
                    alt="promotion-banner"
                    style={{ width: "100%" }}
                  />
                  <Typography variant="caption" component="p">
                    {o.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography variant="subtitle1" color="primary" className="mt-5 text-danger">
            Make sure you upload Image with dimentions 1280 pixels wide and 480
            pixels height
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Button size="small" onClick={() => setOpen(true)}>
              Edit
            </Button>
            <ImageUploader getNewPromo={getNewPromo} Promos={Promos} />
            <WidgetLoader />
          </Grid>
        </div>
      </Paper>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Grid container>
          <Grid item xs={12}>
            <main className={clsx(classes.Modal)}>
              <Paper elevation={0}>
                <List>
                  {Promos.map((o) => (
                    <ListItem>
                      <ListItemText>{o.title}</ListItemText>
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={checked.indexOf(o.asset_id) !== -1}
                          tabIndex={-1}
                          onClick={handleToggle(o.asset_id)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    disableElevation={true}
                    // disabled={items.length >= 0 ? true : false}
                    className={classes.button}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </main>
          </Grid>
        </Grid>
      </Modal>
    </main>
  );
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Carousel);

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { api } from "../config/config";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function EmptyCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleAddClick = () => {
    dispatch({
      type: "ADD_TRAINER",
      payload: axios.post(`${api}/trainer`, { name: name }),
    });
    dispatch({ type: "CHANGE_BKG_COLOR", payload: "#ff7961" });
  };

  const handleInput = (e) => {
    setName(e.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          New Trainer
        </Typography>
        <TextField
          required
          id="trainer-name"
          label="Trainer Name"
          variant="outlined"
          onChange={handleInput}
        ></TextField>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={handleAddClick}>
          Add Trainer
        </Button>
      </CardActions>
    </Card>
  );
}

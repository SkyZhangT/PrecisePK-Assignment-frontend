import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import { ListSubheader } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AddPokemonDialog from "./AddPokemon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function TrainerCard(props) {
  const { data } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value) {
      dispatch({ type: "CHANGE_BKG_COLOR", payload: "#76d275" });
    }
  };

  const handleRemovePokemon = (pokemon) => {
    dispatch({
      type: "UPDATE_POKEMON",
      payload: axios.put(`http://localhost:8080/trainer/${data._id}`, {
        method: "remove",
        pokemon: pokemon,
      }),
    });
  };

  const pokemon_list = data.pokemon_owned.map((pokemon, index) => {
    return (
      <CardActionArea key={index} onClick={() => handleRemovePokemon(pokemon)}>
        <ListItem>
          <ListItemText>{`${pokemon.name}, Type: ${pokemon.type}`}</ListItemText>
        </ListItem>
      </CardActionArea>
    );
  });

  const handleDeleteClick = () => {
    dispatch({
      type: "DELETE_TRAINER",
      payload: axios.delete(`http://localhost:8080/trainer/${data._id}`),
    });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {data.name}
        </Typography>
      </CardContent>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Pokemon Owned
          </ListSubheader>
        }
        dense={false}
      >
        {pokemon_list}
      </List>

      <CardActions>
        <Button size="small" color="primary" onClick={handleClickOpen}>
          Add Pokemon
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={data.pokemon_owned.length !== 0}
          onClick={handleDeleteClick}
        >
          Delete Trainer
        </Button>
      </CardActions>
      <AddPokemonDialog
        trainer_id={data._id}
        open={open}
        onClose={handleClose}
      />
    </Card>
  );
}

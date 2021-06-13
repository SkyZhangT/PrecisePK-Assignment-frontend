import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "../config/config";

function AddPokemonDialog(props) {
  const dispatch = useDispatch();
  const { trainer_id, onClose, selectedValue, open } = props;
  const pokemons = useSelector((state) => state.pokemon.pokemons);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (pokemon) => {
    onClose(pokemon);
    dispatch({
      type: "UPDATE_POKEMON",
      payload: axios.put(`${api}/trainer/${trainer_id}`, {
        method: "add",
        pokemon: pokemon,
      }),
    });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Choose a New Pokemon</DialogTitle>
      <List>
        {pokemons.map((pokemon) => (
          <ListItem
            button
            onClick={() => handleListItemClick(pokemon)}
            key={pokemon.id}
          >
            <ListItemText primary={`${pokemon.name}, Type: ${pokemon.type}`} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

AddPokemonDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  pokemon_map: PropTypes.object.isRequired,
};

export default AddPokemonDialog;

import { makeStyles, Container, Grid, Fab } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import TrainerCard from "./TrainerCard";
import EmptyCard from "./EmptyCard";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  fab: { marginTop: 50 },
});

const Home = () => {
  const classes = useStyles();
  const trainers = useSelector((state) => state.trainer.display);

  const renderList = trainers.map((trainer) => {
    return (
      <Grid key={trainer._id} item xs={3}>
        <TrainerCard data={trainer} />
      </Grid>
    );
  });

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        {renderList}
        <Grid item xs={3}>
          <EmptyCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NavBar from "./components/NavBar";
import TrainerList from "./components/TrainerList";
import "./App.css";
import { api } from "./config/config";

function App() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.theme.background_color);
  dispatch({
    type: "FETCH_POKEMON",
    payload: axios.get(`${api}/pokemon`),
  });
  dispatch({
    type: "FETCH_TRAINER",
    payload: axios.get(`${api}/trainer`),
  });

  return (
    <div className="App" style={{ backgroundColor: color }}>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/battle"></Route>
          <Route exact path="/">
            <TrainerList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

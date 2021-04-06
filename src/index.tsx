import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailsPage from "./Pages/DetailsPage";
import HomePage from "./Pages/HomePage";
import Rocket from "./Pages/Rocket";
ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/details" component={DetailsPage} />
      <Route path="/rocket/:id" component={Rocket} />

      <Route path="/" component={HomePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

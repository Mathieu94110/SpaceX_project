import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailsPage from "./Pages/DetailsPage";
import HomePage from "./Pages/HomePage";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/details" component={DetailsPage} />

      <Route path="/" component={HomePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

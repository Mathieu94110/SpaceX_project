import React, { useState, useEffect, Component } from "react";
import baseURL from "../Api/baseUrl";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import DetailsCard from "../Components/DetailsPageModal/DetailsCard";

//styles//
const styles = (theme: Theme) =>
  createStyles({
    list: {
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
    },
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,
      transform: "translateZ(0)",
      // The position fixed scoping doesn't work in IE 11.
      // Disable this demo to preserve the others.
      "@media all and (-ms-high-contrast: none)": {
        display: "none",
      },
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  });

interface MyProps extends WithStyles<typeof styles> {
  id: number;
  name: string;
  date_utc: string;
  //(`details` field) (`links` sub-fields)(`success` et `tbd` field)
  //(`rocket` field (id))+ page qui affiche nom roquette (`name` field in rocket schema)
  links: {
    article: string;
    patch: {
      large: string;
      small: string;
    };
  };
  flight_number: string;
  ChangeFormateDate: () => string;
  details: string;
  test: () => any;
}
interface MyState {
  allLaunches: any[];
  listLaunches: any[];
  search: string;
}

class DetailsPage extends Component<MyProps, MyState> {
  _isMounted = false;
  constructor(props: MyProps) {
    super(props);
    this.state = {
      listLaunches: [],
      allLaunches: [],
      search: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const request = async () => {
      const url: string = `${baseURL}/launches`;
      const response = await fetch(url);

      try {
        const json = await response.json();
        console.log("Reponse data ", json);
        this.setState({
          allLaunches: json,
          listLaunches: json,
        });
      } catch (e) {
        console.log("Error! " + e);
      }
    };
    request();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  ChangeFormateDate = (date: string) => {
    return date.substring(0, 10).toString().split("-").reverse().join("-");
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value }, () => {
      // filtering
      let regex = new RegExp(this.state.search, "i");
      let results: any[] = this.state.listLaunches.filter(
        (launch: any) => launch.details && launch.details.match(regex)
      );
      this.setState({ allLaunches: results });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <TextField
            label="Détail du lancement"
            variant="outlined"
            onChange={this.handleSearchChange}
          />
        </div>

        <div className={classes.list}>
          {this.state.allLaunches.map((Launche: MyProps, index: number) => (
            <div key={"launches" + index}>
              <DetailsCard
                ChangeFormateDate={this.ChangeFormateDate}
                Launche={Launche}
                key={Launche.id}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DetailsPage);

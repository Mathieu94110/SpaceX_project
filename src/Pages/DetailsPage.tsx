import React, { Component } from "react";
import baseURL from "../Api/baseUrl";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import DetailsCard from "../Components/DetailsPageModal/DetailsCard";
import { Link } from "react-router-dom";

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
    header: {
      width: "100%",
      height: "60px !important",
      margin: "20px auto !important",
      position: "relative",
      display: "flex",
      justifyContent: "center",
    },
    textfield: {
      margin: "auto !important",
    },
    upcomingLaunchesPage: {
      position: "absolute",
      right: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "12px",
    },
    spinnerWrapper: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    spinner: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  });
//         //

// props   //
interface MyProps extends WithStyles<typeof styles> {
  id: number;
  name: string;
  date_utc: string;
  links: {
    article: string;
    patch: {
      large: string;
      small: string;
    };
  };
  flight_number: string;
  details: string;
  ChangeFormateDate: () => string;

  test: () => any;
}
interface MyState {
  allLaunches: any[];
  listLaunches: any[];
  search: string;
  loading: boolean;
}
//          //

class DetailsPage extends Component<MyProps, MyState> {
  _isMounted = false;
  constructor(props: MyProps) {
    super(props);
    this.state = {
      listLaunches: [],
      allLaunches: [],
      search: "",
      loading: true,
    };
  }

  request = async () => {
    const url: string = `${baseURL}/launches`;
    const response = await fetch(url);

    try {
      const json = await response.json();
      console.log("Reponse data ", json);
      this.setState({
        loading: false,
        allLaunches: json,
        listLaunches: json,
      });
    } catch (e) {
      console.log("Error! " + e);
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.request();
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
    if (this.state.loading) {
      return (
        <div className={classes.spinnerWrapper}>
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className={classes.header}>
            <TextField
              label="Détail du lancement"
              variant="outlined"
              onChange={this.handleSearchChange}
              className={classes.textfield}
            />
            <div className={classes.upcomingLaunchesPage}>
              <Link to="/">
                <Button variant="contained" color="primary">
                  Prochains lancements
                </Button>
              </Link>
            </div>
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
}

export default withStyles(styles)(DetailsPage);

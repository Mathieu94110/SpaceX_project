import React, { Component } from "react";
import baseURL from "../Api/baseUrl";
import ModalView from "../Components/ModalPopup/ModalView";
import {
  Card,
  createStyles,
  withStyles,
  WithStyles,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import rocket_default_img from "../images/rocket.png";
import { Link } from "react-router-dom";

//  styles  //
export const styles = () =>
  createStyles({
    wrapper: {
      width: "100%",
      height: "100%",
    },
    header: {
      width: "100%",
      height: "60px !important",
      margin: "20px auto !important",
      position: "relative",
    },
    detailsPageLink: {
      position: "absolute",
      left: "10px",
    },

    home_title: {
      textAlign: "center",
    },
    container: {
      width: "100%",
      height: "100%",
    },
    list: {
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
    },
    card: {
      width: 300,
      margin: "20px 0",
    },
    root: {
      width: 300,
      padding: "20px",
      marginBottom: "10px",
    },
    media: {
      height: 140,
    },
    fonts: {
      fontWeight: 400,
      color: "#000 !important",
      fontSize: "16px !important",
    },
    fontsDatas: {
      color: "blue",
      fontWeight: 600,
    },
  });

//   types  //
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
  ChangeFormateDate: () => string;
  details: string;
  test: () => any;
  launchpad: string;
  rocket: string;
}
interface MyState {
  futurLaunches: [];
}
//    //
class HomePage extends Component<MyProps, MyState> {
  _isMounted = false;
  constructor(props: MyProps) {
    super(props);
    this.state = {
      futurLaunches: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const request = async () => {
      const url: string = `${baseURL}/launches/upcoming`;
      const response = await fetch(url);
      console.log("Reponse data " + response);
      try {
        const json = await response.json();
        console.log(json);
        this.setState({
          futurLaunches: json,
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
  //
  ChangeFormateDate = (date: string) => {
    return date.substring(0, 10).toString().split("-").reverse().join("-");
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.futurLaunches);
    return (
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.detailsPageLink}>
            <Link to="/details">
              <Button variant="contained" color="primary">
                Page de détails
              </Button>
            </Link>
          </div>{" "}
          <h1 className={classes.home_title}>Prochains lancements</h1>
        </div>
        <div className={classes.container}>
          <ul className={classes.list}>
            {this.state.futurLaunches.map((futurLaunche: MyProps) => (
              <li>
                <Card key={futurLaunche.id} className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={futurLaunche.name}
                      className={classes.media}
                      image={
                        futurLaunche.links.patch.large !== null
                          ? futurLaunche.links.patch.large
                          : rocket_default_img
                      }
                      title={futurLaunche.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        <div className={classes.fonts}>
                          Nom :{" "}
                          <span className={classes.fontsDatas}>
                            {" "}
                            {futurLaunche.name}
                          </span>
                        </div>
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        <div className={classes.fonts}>
                          Date de lancement :
                          <span className={classes.fontsDatas}>
                            {" "}
                            {futurLaunche.date_utc !== null
                              ? this.ChangeFormateDate(futurLaunche.date_utc)
                              : "Pas de date de lancement prévu"}
                          </span>
                        </div>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <div className={classes.fonts}>
                          Numéro de vol :{" "}
                          <span className={classes.fontsDatas}>
                            {" "}
                            {futurLaunche.flight_number}
                          </span>
                        </div>
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {futurLaunche.links.article !== null
                          ? futurLaunche.links.article
                          : "Aucun articles concernant ce lancement !"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <ModalView launch={futurLaunche} />
                  </CardActions>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: false })(HomePage);

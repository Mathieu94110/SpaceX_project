import React, { Component } from "react";
import baseURL from "../Api/baseUrl";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import rocket_default_img from "../images/rocket.png";
//styles//
const styles = () =>
  createStyles({
    wrapper: {
      width: "100%",
      height: "100%",
    },
    home_title: {
      textAlign: "center",
    },
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-evenly",
      flexWrap: "wrap",

      overflowX: "hidden",
    },
    root: {
      width: 300,
      padding: "20px",
      marginBottom: "10px",
    },
    media: {
      height: 140,
    },
  });

//types//
interface MyProps extends WithStyles<typeof styles> {
  name: string;
  date_utc: string;

  links: {
    patch: {
      small: string;
      large: string;
    };
    article: string;
  };
}
interface MyState {
  futurLaunches: [];
}
//    //
class HomePage extends Component<MyProps, MyState> {
  _isMounted = false;
  constructor(props: any) {
    super(props);
    this.state = {
      futurLaunches: [],
    };
  }
  //
  componentDidMount() {
    this._isMounted = true;
    const request = async () => {
      const url: string = `${baseURL}/launches/upcoming`;
      const response = await fetch(url);
      console.log(response);
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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <h1 className={classes.home_title}>Prochains lancements</h1>
        <div className={classes.container}>
          {this.state.futurLaunches.map(
            (futurLaunche: MyProps, index: number) => (
              <>
                <Card className={classes.root} key={index}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
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
                        Nom : {futurLaunche.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Date de lancement : {futurLaunche.date_utc}
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
                    <Button size="small" color="primary">
                      Voir l'article
                    </Button>
                    <Button size="small" color="primary">
                      Détail de la roquette
                    </Button>
                  </CardActions>
                </Card>
              </>
            )
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: false })(HomePage);

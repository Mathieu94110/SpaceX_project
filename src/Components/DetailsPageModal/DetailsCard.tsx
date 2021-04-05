import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import rocket_default_img from "../../images/rocket.png";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme: Theme) =>
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
    },
    modal: {
      display: "flex",
      padding: theme.spacing(1),
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      width: 300,
      maxHeight: 380,
      margin: "30px",
      overflow: "auto",
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
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const DetailsCard = (prop: any) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleisOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Card
        key={prop.Launche.id}
        onClick={handleisOpen}
        className={classes.card}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt={prop.Launche.name}
            height={140}
            className={classes.media}
            image={
              prop.Launche.links.patch.large !== null
                ? prop.Launche.links.patch.large
                : rocket_default_img
            }
            title={prop.Launche.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <div className={classes.fonts}>
                Nom :{" "}
                <span className={classes.fontsDatas}> {prop.Launche.name}</span>
              </div>
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <div className={classes.fonts}>
                Détails :{" "}
                <span className={classes.fontsDatas}>
                  {" "}
                  {prop.Launche.details}
                </span>
              </div>
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <div className={classes.fonts}>
                Date de lancement :
                <span className={classes.fontsDatas}>
                  {" "}
                  {prop.Launche.date_utc !== null
                    ? prop.ChangeFormateDate(prop.Launche.date_utc)
                    : "Pas de date de lancement prévu"}
                </span>
              </div>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <div className={classes.fonts}>
                Numéro de vol :{" "}
                <span className={classes.fontsDatas}>
                  {" "}
                  {prop.Launche.flight_number}
                </span>
              </div>
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {prop.Launche.links.article !== null
                ? prop.Launche.links.article
                : "Aucun articles concernant ce lancement !"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Vue détaillée
          </Button>
        </CardActions>
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <p> Détails: {prop.Launche.details}</p>
            {prop.Launche.links.article !== null ? (
              <p>
                Article :{" "}
                <a href={prop.Launche.links.article}>
                  {prop.Launche.links.article}
                </a>
              </p>
            ) : (
              "Pas d'article disponible pour ce lancement"
            )}
            <p>
              Youtube:{" "}
              <a href={prop.Launche.links.webcast}>
                {prop.Launche.links.webcast}
              </a>
            </p>
            <p>
              Wikipédia :{" "}
              <a href={prop.Launche.links.wikipedia}>
                {prop.Launche.links.wikipedia}
              </a>
            </p>
            <p>
              A définir :
              {prop.Launche.tbd === false ? " Non" : prop.Launche.tbd}
            </p>
            <p>Réussite :{prop.Launche.success ? "Oui" : "Non"}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default DetailsCard;

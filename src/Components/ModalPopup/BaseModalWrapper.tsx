import React from "react";
import Modal from "./Modal";
import { makeStyles } from "@material-ui/core/styles";

//styles//
const useStyles = makeStyles({
  modalContent: {
    fontSize: "35px",
    fontWeight: 300,
    margin: "5px 0 10px",
    textAlign: "center",
  },
  modalContainer: {
    borderRadius: "7px",
    boxShadow: "0 0 32px #fff",
    padding: "40px",
    width: "300px",
    height: "300px",
    fontSize: "26px",
    overflow: "auto",
  },
  styledBlue: {
    color: "blue",
  },
});

export interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  launch: any;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
  launch,
}) => {
  const classes = useStyles();

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <div className={classes.modalContainer}>
        <h2 className={classes.modalContent}>
          <span className={classes.styledBlue}>Nom :</span> {launch.name}
        </h2>
        <p>
          <span className={classes.styledBlue}>Fusée :</span> {launch.rocket}
        </p>
        <p>
          <span className={classes.styledBlue}>Rampe de lancement :</span>{" "}
          {launch.launchpad}
        </p>
        <p>
          <span className={classes.styledBlue}>Détails :</span>{" "}
          {launch.details ? launch.details : "Aucun détail !"}
        </p>
      </div>
    </Modal>
  );
};

export default BaseModalWrapper;

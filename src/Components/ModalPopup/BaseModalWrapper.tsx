import React from "react";
import Modal from "./Modal";
import { makeStyles } from "@material-ui/core/styles";

//styles//
const useStyles = makeStyles({
  modalContent: {
    color: "white",
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
  },
});

export interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
}) => {
  const classes = useStyles();

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <div className={classes.modalContainer}>
        <div className={classes.modalContent}>Test modal display</div>
      </div>
    </Modal>
  );
};

export default BaseModalWrapper;

import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";

interface ModalProps {
  onBackdropClick: () => void;
}

const useStyles = makeStyles({
  container: {
    background: "rgba(119, 136, 153, 0.5)",
    position: "fixed",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Modal: React.FC<ModalProps> = ({ onBackdropClick, children }) => {
  const classes = useStyles();
  return ReactDOM.createPortal(
    <div onClick={onBackdropClick} className={classes.container}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;

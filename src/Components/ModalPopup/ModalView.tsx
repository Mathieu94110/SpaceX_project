import { useState } from "react";
import BaseModalWrapper from "./BaseModalWrapper";
import Button from "@material-ui/core/Button";

interface Props {
  launch: any;
}
function ModalView(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };

  return (
    <div>
      {" "}
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={toggleModal}
      >
        Plus d'informations
      </Button>
      <BaseModalWrapper
        launch={props.launch}
        isModalVisible={isModalVisible}
        onBackdropClick={toggleModal}
      />
    </div>
  );
}
export default ModalView;

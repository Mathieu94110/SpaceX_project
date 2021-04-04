import { useState } from "react";
import BaseModalWrapper from "./BaseModalWrapper";

function ModalView() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };

  return (
    <div>
      <button onClick={toggleModal}>Plus d'informations</button>
      <BaseModalWrapper
        isModalVisible={isModalVisible}
        onBackdropClick={toggleModal}
      />
    </div>
  );
}
export default ModalView;

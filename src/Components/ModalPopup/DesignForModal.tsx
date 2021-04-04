import React from "react";
import BaseModalWrapper, { BaseModalWrapperProps } from "./BaseModalWrapper";

type DesignModalProps = BaseModalWrapperProps;

const DesignForModal: React.FC<DesignModalProps> = (props) => {
  return (
    <div>
      <BaseModalWrapper {...props} />
    </div>
  );
};

export default DesignForModal;

/*eslint-disable react/prop-types*/
import React from "react";
import { Modal } from "semantic-ui-react";
//import PropTypes from "prop-types";
import { Form } from "./Form";

export const ModalComponent = React.forwardRef(function ({ children }, ref) {
  const [modalState, setModalState] = React.useState(null);
  React.useImperativeHandle(ref, () => ({
    open: (vars) => {
      return new Promise((resolve, reject) => {
        const closeModal = (outcome) => (values) => {
          setModalState(null);
          outcome(values);
        };
        setModalState(
          <Modal open={true}>
            <Form
              onSubmit={closeModal(resolve)}
              onCancel={closeModal(reject)}
              defaultValues={vars}
            >
              {children}
            </Form>
          </Modal>
        );
      });
    },
  }));
  return modalState;
});

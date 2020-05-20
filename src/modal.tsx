/*eslint-disable react/prop-types*/
import React, { MutableRefObject,ReactChildren } from "react";
import { Modal } from "semantic-ui-react";
//import PropTypes from "prop-types";
import { Form } from "./Form";

interface ModalProps{
  children:ReactChildren
}

export const ModalComponent = React.forwardRef(({ children }:ModalProps, ref)=>{
  const [modalState, setModalState] = React.useState(null);
  const resolveRef:MutableRefObject<(v:object)=>void>=React.useRef()
  const rejectRef:MutableRefObject<()=>void>=React.useRef()
  const defaultValues:MutableRefObject<object>=React.useRef()
  const closeModal = (outcome:(v?:object)=>void) => (values?:object) => {
    setModalState(null);
    outcome(values);
  };
  React.useImperativeHandle(ref, () => ({
    open: (vars:object) => {
      return new Promise((resolve, reject) => {
        
        setModalState(true)
        resolveRef.current=resolve
        rejectRef.current=reject
        defaultValues.current=vars
      }
       
       
      );
    },
  }));
  return modalState && (   
  <Modal open={true}>
  <Form
    onSubmit={closeModal(resolveRef.current)}
    onCancel={closeModal(rejectRef.current)}
    defaultValues={defaultValues.current}
  >
    {children}
  </Form>
  </Modal>
  );
});
ModalComponent.displayName = "ModalComponent";

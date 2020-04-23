/*eslint-disable react/prop-types*/
import React from "react";
import { Form } from "semantic-ui-react";
import { Controller } from "react-hook-forms";
import FormRow from "./FormRow";
export function InputComponent({ name, validate }) {
  return (
    <FormRow
      component={<Controller as={Form.Input} name={name} rules={validate} />}
    />
  );
}
export function TextAreaComponent({ name, validate }) {
  return (
    <FormRow
      component={<Controller as={Form.TextArea} name={name} rules={validate} />}
    />
  );
}
export function HiddenComponent({ name }) {
  return <Controller name={name} as="input" type="hidden" />;
}

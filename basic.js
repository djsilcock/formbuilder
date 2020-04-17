/*eslint-disable react/prop-types*/
import React from "react";
import { Form } from "semantic-ui-react";
import { FastField } from "formik";
import FormRow from './FormRow'
export function InputComponent({ name, validate }) {
  return <FormRow component={<FastField as={Form.Input} name={name} validate={validate} />}/>;
}
export function TextAreaComponent({ name, validate }) {
  return <FormRow component={<FastField as={Form.TextArea} {...{ name, validate }} />}/>;
}
export function HiddenComponent({ name }) {
  return <FastField name={name} as="input" type="hidden" />;
}
HiddenComponent.isInvisible = true;

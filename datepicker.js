/*eslint-disable react/prop-types*/
import React from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Controller } from "react-hook-forms";
import FormRow from "./FormRow";
export function DatePickerComponent({ name, validate, placeholder }) {
  //eslint-disable-next-line no-unused-vars
  return (
    <Controller
      as={DateInput}
      name={name}
      placeholder={placeholder}
      iconPosition="left"
      onChange={(e, { value }) => value}
      rules={validate}
    />
  );
}
export function DatePickerField(props) {
  return <FormRow component={DatePickerComponent} {...props} />;
}

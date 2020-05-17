/*seslint-disable react/prop-types*/
import React from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Controller } from "react-hook-form";
import { FormRow } from "./FormRow";
import { getValidator } from "./utils/getValidator";
import PropTypes from "prop-types";

interface DatePickerProps

export function DatePickerComponent({ name, placeholder, ...props }:DatePickerProps) {
  return (
    <Controller
      as={DateInput}
      name={name}
      id={name}
      placeholder={placeholder}
      iconPosition="left"
      // eslint-disable-next-line no-unused-vars
      onChange={([e, props]) => {
        return props?.value;
      }}
      rules={getValidator(props)}
    />
  );
}
DatePickerComponent.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export function DatePickerField(props) {
  return <FormRow component={DatePickerComponent} id={props.name} {...props} />;
}
DatePickerField.getDefaultValue = () => "";
DatePickerField.propTypes = { name: PropTypes.string };

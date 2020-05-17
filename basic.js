import React from "react";
import { Input, TextArea } from "./src/components";
import { useFormContext } from "react-hook-form";
import { FormRow } from "./FormRow";
import { expandValidator } from "./src/utils/getValidator";
import PropTypes from "prop-types";
export function TextField({ multiline, ...props }) {
  const { register } = useFormContext();
  const validate = expandValidator(props);
  const Component = multiline ? TextArea : Input;
  return (
    <FormRow
      component={Component}
      id={`${props.name}-input`}
      refCallback={register(validate)}
      {...props}
    />
  );
}
TextField.propTypes = { multiline: PropTypes.bool, name: PropTypes.string };
TextField.defaultProps = { defaultValue: "" };
TextField.getDefaultValue = () => {};

export function HiddenComponent({ name }) {
  const { register } = useFormContext();
  return <input ref={register} name={name} />;
}
HiddenComponent.propTypes = { name: PropTypes.string };

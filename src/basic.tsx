import React from "react";
import { Input, TextArea } from "./components";
import { useFormContext } from "react-hook-form";
import { FormRow, FormRowProps } from "./FormRow";
import { getValidator } from "./utils/getValidator";
import PropTypes from "prop-types";

interface TextFieldProps extends FormRowProps {
  multiline: boolean;
}
export function TextField({ multiline, ...props }: TextFieldProps) {
  const { register } = useFormContext();
  const validate = getValidator(props);
  const Component = multiline ? TextArea : Input;
  return (
    <FormRow {...props}>
      <Component
        id={`${props.name}-input`}
        refCallback={register(validate)}
        {...props}
      />
    </FormRow>
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

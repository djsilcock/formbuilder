/*eslint-disable react/prop-types*/
import React from "react";
import { Form, Input, TextArea } from "./components";
import { useFormContext } from "react-hook-form";
import { FormRow } from "./FormRow";
export function TextField({ validate, multiline, ...props }) {
  const { register } = useFormContext();
  const Component = multiline ? TextArea : Input;
  return (
    <FormRow
      component={Component}
      id={`${props.name}-input`}
      refCallback={register({ rules: validate })}
      {...props}
    />
  );
}

export function HiddenComponent({ name }) {
  const { register } = useFormContext();
  return <input ref={register} name={name} />;
}

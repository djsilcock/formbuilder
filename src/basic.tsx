import React from "react";
import { Input, TextArea } from "./components";
import { useFormContext, ValidationOptions } from "react-hook-form";
import { FormRow, FormRowProps } from "./FormRow";
import PropTypes from "prop-types";

interface TextComponentProps {
  multiline?: boolean;
  name: string;
  placeholder?: string;
  validation?: ValidationOptions;
}

interface TAwithPrivate extends TextArea {
  ref: React.MutableRefObject<HTMLTextAreaElement>;
}
interface InputWithPrivate extends Input {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}
export const TextComponent: React.FC<TextComponentProps> = ({
  multiline,
  name,
  validation,
  ...props
}) => {
  const { register } = useFormContext();
  return multiline ? (
    <TextArea
      ref={(r: TAwithPrivate) => register(r.ref.current, validation)}
      id={`${name}-input`}
      {...props}
    />
  ) : (
    <Input
      ref={(r: InputWithPrivate) => register(r.inputRef.current, validation)}
      id={`${name}-input`}
      {...props}
    />
  );
};

export function TextField(props: TextComponentProps & FormRowProps) {
  return <FormRow component={TextComponent} {...props} />;
}
TextField.propTypes = { multiline: PropTypes.bool, name: PropTypes.string };
TextField.defaultProps = { defaultValue: "" };
TextField.getDefaultValue = () => {};

export function HiddenComponent({ name }) {
  const { register } = useFormContext();
  return <input ref={register} name={name} />;
}
HiddenComponent.propTypes = { name: PropTypes.string };

//TODO: validation

import React from "react";
import { chunk } from "lodash";
import { Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import { FormRow, FormRowProps } from "./FormRow";
import { useFormContext } from "react-hook-form";
//import { expandValidator } from "./utils/expandValidator";
interface CheckboxRadioProps {
  options: Array<[string, string]>;
  name: string;
  valueType: "boolean" | "value";
  type: "radio" | "checkbox";
}
interface BaseCheckboxProps extends CheckboxRadioProps {
  numCols: 1 | 2 | 3 | 4 | 5;
  type: "radio" | "checkbox";
}
export function BaseCheckboxComponent({
  numCols,
  options,
  name,
  valueType = "boolean",
  type,
}: //...props
BaseCheckboxProps) {
  //const validate = expandValidator(props);
  const { register } = useFormContext();
  var buttons = options.map(([val, btnlabel]) => (
    <div key={val}>
      <div className={type == "radio" ? "ui radio checkbox" : "ui checkbox"}>
        <input
          type={type}
          ref={register}
          id={`${name}-${val}`}
          name={type == "radio" ? name : `${name}.${val}`}
          value={type == "checkbox" && valueType == "boolean" ? undefined : val}
        />
        <label htmlFor={`${name}-${val}`}>{btnlabel}</label>
      </div>
    </div>
  ));
  const colLength = Math.ceil(buttons.length / numCols);
  const cols = chunk(buttons, colLength).map((column, idx) => (
    <Grid.Column key={idx}>{column}</Grid.Column>
  ));
  return (
    <>
      <input ref={register} name={`${name}.root`} />
      <Grid stackable columns={numCols}>
        {cols}
      </Grid>
    </>
  );
}
BaseCheckboxComponent.propTypes = {
  numCols: PropTypes.number,
  options: PropTypes.array,

  name: PropTypes.string,
  valueType: PropTypes.oneOf(["boolean", "value"]),
  type: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.any,
};

export function RadioComponent(props: CheckboxRadioProps) {
  return <BaseCheckboxComponent type="radio" numCols={1} {...props} />;
}
export function CheckboxComponent(props: CheckboxRadioProps) {
  return <BaseCheckboxComponent type="checkbox" numCols={2} {...props} />;
}
interface CheckboxRadioFieldProps extends CheckboxRadioProps, FormRowProps {}
export function RadioField(props: CheckboxRadioFieldProps) {
  return <FormRow component={RadioComponent} {...props} />;
}
RadioField.getDefaultValue = () => "";

export function CheckboxField(props: CheckboxRadioFieldProps) {
  return <FormRow component={CheckboxComponent} {...props} />;
}
CheckboxField.getDefaultValue = () => [];

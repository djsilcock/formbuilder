/*eslint-disable react/prop-types*/
import React, { useMemo } from "react";
import { chunk } from "lodash";
import { Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Radio, Checkbox } from "./components";
import { FormRow } from "./FormRow";
import { useFormContext } from "react-hook-form";

export function BaseCheckboxComponent({
  Component,
  validate,
  numCols,
  options,
  name,
  type,
  ...props
}) {
  const { register } = useFormContext();

  return useMemo(() => {
    var buttons = options.map(([val, btnlabel]) => (
      <div key={val}>
        <div className={type == "radio" ? "ui radio checkbox" : "ui checkbox"}>
          <input
            type={type}
            id={`${name}-${val}`}
            class="hidden"
            name={name}
            ref={register({ rules: validate })}
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
      <Grid stackable columns={numCols}>
        {cols}
      </Grid>
    );
  }, [options]);
}
BaseCheckboxComponent.propTypes = {
  Component: PropTypes.any,
  numCols: PropTypes.number,
  options: PropTypes.array,
  optionsfrom: PropTypes.func,
};

export function RadioComponent(props) {
  return <BaseCheckboxComponent type="radio" numCols={1} {...props} />;
}
export function CheckboxComponent(props) {
  return <BaseCheckboxComponent type="checkbox" numCols={2} {...props} />;
}

export function RadioField(props) {
  return <FormRow component={RadioComponent} {...props} />;
}

export function CheckboxField(props) {
  return <FormRow component={CheckboxComponent} {...props} />;
}

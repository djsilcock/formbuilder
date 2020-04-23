/*eslint-disable react/prop-types*/
import React, { useMemo } from "react";
import { chunk } from "lodash";
import { Grid } from "semantic-ui-react";
import { Controller } from "react-hook-forms";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import FormRow from "./FormRow";

export function BaseCheckboxComponent({
  Component,
  validate,
  numCols,
  options,
  name,
  ...props
}) {
  options = options;
  const WrappedCheckbox = ({ value: boxValue, label }) => {
    return (
      <Controller
        as={Component}
        name={name}
        rules={validate}
        value={boxValue}
        label={label}
        {...props}
      />
    );
  };

  return useMemo(() => {
    var buttons = options.map(([val, btnlabel]) => (
      <WrappedCheckbox key={val} value={val} label={btnlabel} />
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
  return (
    <BaseCheckboxComponent
      Component={Form.Radio}
      type="radio"
      numCols={1}
      {...props}
    />
  );
}
export function CheckboxComponent(props) {
  return (
    <BaseCheckboxComponent
      Component={Form.Checkbox}
      type="checkbox"
      numCols={2}
      {...props}
    />
  );
}

export function RadioField(props) {
  return <FormRow component={RadioComponent} {...props} />;
}

export function CheckboxField(props) {
  return <FormRow component={CheckboxComponent} {...props} />;
}

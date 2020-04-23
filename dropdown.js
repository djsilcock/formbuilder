/*eslint-disable react/prop-types*/

import React, { useMemo, useCallback } from "react";
import { get } from "lodash";

import { Dropdown } from "semantic-ui-react";
import { useFormContext, Controller } from "react-hook-forms";
import PropTypes from "prop-types";
import { FormRow } from "./FormRow";

export function DropdownComponent({
  search,
  validate,
  addItem,
  placeholder,
  closeOnChange = true,
  name,
  options,
  multiple,
  allowNew,
}) {
  const formctx = useFormContext();
  const onChange = useCallback((e, { value }) => value, []);
  const renderLabel = useCallback(
    ({ text, color }) => ({ content: text, color }),
    []
  );
  const onAddItem = useCallback(
    async (e, { value }) => {
      const newvalue = await addItem(value);
      if (newvalue)
        formctx.setValue(
          name,
          multiple ? formctx.getValues(name).concat([newvalue]) : newvalue.value
        );
    },
    [formctx]
  );
  return (
    <Controller
      as={Dropdown}
      control={formctx.control}
      placeholder={placeholder}
      fluid
      search={search || false}
      selection
      options={options}
      allowAdditions={allowNew || false}
      multiple={multiple}
      name={name}
      error={!!get(formctx.errors, name)}
      onChange={onChange}
      renderLabel={renderLabel}
      onAddItem={onAddItem}
      rules={validate}
      closeOnChange={closeOnChange}
    />
  );
}
DropdownComponent.propTypes = {
  search: PropTypes.bool,
  optionsfrom: PropTypes.func,
  label: PropTypes.string,
  errors: PropTypes.any,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  requiredif: PropTypes.func,
  enabledif: PropTypes.func,
  displayif: PropTypes.func,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  allowNew: PropTypes.bool,
};

export function DropdownField(props) {
  return <FormRow component={DropdownComponent} {...props} />;
}

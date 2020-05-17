import React, { useCallback } from "react";
import { get } from "lodash";

import { Dropdown } from "semantic-ui-react";
import { useFormContext, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { FormRow } from "./FormRow";
import { getValidator } from "./utils/getValidator";

export function DropdownComponent({
  search,
  addItem,
  placeholder,
  closeOnChange = true,
  name,
  options,
  multiple,
  allowNew,
  ...props
}) {
  const formctx = useFormContext();
  // eslint-disable-next-line no-unused-vars
  const onChange = useCallback(([e, { value }]) => value, []);
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
      id={name}
      fluid
      search={search || false}
      selection
      options={options.map(([value, text]) => ({ value, text }))}
      allowAdditions={allowNew || false}
      multiple={multiple}
      name={name}
      error={!!get(formctx.errors, name)}
      onChange={onChange}
      renderLabel={renderLabel}
      onAddItem={onAddItem}
      rules={getValidator(props)}
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
  addItem: PropTypes.func,
  closeOnChange: PropTypes.bool,
};

export function DropdownField(props) {
  return <FormRow component={DropdownComponent} id={props.name} {...props} />;
}
DropdownField.getDefaultValue = (props) => (props.multiple ? [] : "");
DropdownField.propTypes = { name: PropTypes.string };

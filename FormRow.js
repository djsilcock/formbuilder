import React from "react";
import PropTypes from "prop-types";
import { Form, Message, Table } from "semantic-ui-react";
import { useFormContext } from "react-hook-form";
import { get } from "lodash";

const FormRow = React.memo(function ({
  name,
  component: Component,
  displayif,
  label,
  helptext,
  required,
  children,
  innerRef,
  ...props
}) {
  const formContext = useFormContext();
  const errorMessage = get(formContext.error, name, null);
  if (displayif && !displayif(formcontext.watch)) return null;
  return (
    <Table.Row>
      <Table.Cell width={8}>
        <Form.Field required={required} error={!!errorMessage}>
          <label htmlFor={props.id}>{label}</label>
        </Form.Field>
        {helptext ? <Message info>{`${helptext}`}</Message> : null}
        {errorMessage && (
          <Message error visible>
            {errorMessage}
          </Message>
        )}
      </Table.Cell>
      <Table.Cell width={8}>
        <Form.Field error={!!errorMessage}>
          {Component ? (
            <Component innerRef={innerRef} name={name} {...props} />
          ) : (
            children
          )}
        </Form.Field>
      </Table.Cell>
    </Table.Row>
  );
});
FormRow.propTypes = {
  valid: PropTypes.bool,
  errors: PropTypes.any,
  display: PropTypes.bool,
  label: PropTypes.string,
  helptext: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.any,
};

export { FormRow };

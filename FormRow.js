import React from "react";
import { Form, Message, Table } from "semantic-ui-react";
import { useFormContext } from "react-hook-forms";
import { get } from "lodash";

function FormRow({
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
        <Form.Field required={required} error={thisFieldHasError}>
          <label>{label}</label>
        </Form.Field>
        {helptext ? <Message info>{`${helptext}`}</Message> : null}
        {errorMessage && (
          <Message error visible>
            {errorMessage}
          </Message>
        )}
      </Table.Cell>
      <Table.Cell width={8}>
        <Form.Field error={thisFieldHasError}>
          {Component ? (
            <Component ref={innerRef} name={name} {...props} />
          ) : (
            children
          )}
        </Form.Field>
      </Table.Cell>
    </Table.Row>
  );
}
FormRow.propTypes = {
  valid: PropTypes.bool,
  errors: PropTypes.any,
  display: PropTypes.bool,
  label: PropTypes.string,
  helptext: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.any,
};

export default React.memo(FormRow);

import React, { JSXElementConstructor, ReactNode, ReactNodeArray } from "react";
import PropTypes from "prop-types";
import { Form, Message, Table } from "semantic-ui-react";
import { useFormContext } from "react-hook-form";
import { get } from "lodash";

export interface FormRowProps {
  name: string;
  id: string;
  label: ReactNode;
  helptext?: ReactNode;
  required?: boolean;
}
interface FormRowComponentProps extends FormRowProps {
  component: JSXElementConstructor<any>;
}
interface FormRowChildrenProps extends FormRowProps {
  children?: ReactNode | ReactNodeArray;
}

function FormRow(props: FormRowChildrenProps);
function FormRow(props: FormRowComponentProps);
function FormRow(props: any) {
  const {
    name,
    component: Component,
    label,
    helptext,
    required,
    children,
  } = props;
  const formContext = useFormContext();
  const errorMessage = get(formContext.errors, name, null);
  return (
    <Table.Row>
      <Table.Cell width={8}>
        <Form.Field required={required} error={!!errorMessage}>
          <label htmlFor={props.id}>{label}</label>
        </Form.Field>
        {helptext ? <Message info>{`${helptext}`}</Message> : null}
        {errorMessage && (
          <Message error visible>
            {errorMessage.message || "Please check your response here"}
          </Message>
        )}
      </Table.Cell>
      <Table.Cell width={8}>
        <Form.Field error={!!errorMessage}>
          {Component ? <Component name={name} {...props} /> : children}
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
  name: PropTypes.string,
  component: PropTypes.elementType,
  id: PropTypes.string,
};
FormRow.displayName = "FormRow";

export { FormRow };

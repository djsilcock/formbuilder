import React from "react";
import { Form, Message, Table } from "semantic-ui-react";
import { ErrorMessage } from "formik";
function FormRow ({ name, component: Component, displayif, label, helptext, required, error, touched, formik, ...props }) {
  displayif = displayif || (() => true);
  if (!displayif(formik))
    return null;
  return (<Table.Row>
    <Table.Cell width={8}>
      <Form.Field required={required} error={!!error && touched}>
        <label>{label}</label>
      </Form.Field>
      {helptext ? <Message info>{`${helptext}`}</Message> : null}
      <ErrorMessage name={name}>
        {msg => (<Message error visible>
          {`${JSON.stringify(msg)}`}
        </Message>)}
      </ErrorMessage>
    </Table.Cell>
    <Table.Cell width={8}>
      <Component name={name} {...props} />
    </Table.Cell>
  </Table.Row>);
};
FormRow.propTypes = {
  valid: PropTypes.bool,
  errors: PropTypes.any,
  display: PropTypes.bool,
  label: PropTypes.string,
  helptext: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.any
};

export default React.memo(FormRow)
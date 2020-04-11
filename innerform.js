/*eslint-disable react/prop-types*/

import React from "react";
import { merge } from "lodash";
import { Form, Table, Button } from "semantic-ui-react";
import { Formik, useFormikContext } from "formik";
//import PropTypes from "prop-types";

export function InnerFormContainer({
  formdef,
  initialValues,
  initialStatus,
  onSubmit,
  onCancel,
  action
}) {
  const {
    components,
    defaultValues,
    formvalidate,
    effects,
    listeners
  } = formdef;

  const validation = {
    [formvalidate?.__isYupSchema__
      ? "validationSchema"
      : "validate"]: formvalidate
  };
  return (
    <div>
      <Formik
        initialStatus={Object.assign(initialStatus || {}, {
          modalQueue: []
        })}
        initialValues={merge(defaultValues, initialValues)}
        {...validation}
        onSubmit={onSubmit}
      >
        {formikprops => {
          const dispatch = React.useCallback(e => {
            const eventListeners = listeners[e.type] || [];
            return Promise.all(
              eventListeners.map(l => {
                l({ context, ...e });
              })
            );
          });
          effects.forEach(e => e(formikprops));
          return (
            <Form action={action}>
              <Table selectable>
                <Table.Body>{components.map((c) => React.cloneElement(c, { formik: formikprops,dispatch }))}</Table.Body>
              </Table>
              <Button
                icon="check"
                content="Save"
                type="button"
                onClick={formikprops.submitForm}
              />
              <Button
                icon="cancel"
                content="Reset"
                type="button"
                onClick={formikprops.resetForm}
              />
              {onCancel ? (
                <Button
                  icon="cancel"
                  content="Cancel"
                  type="button"
                  onClick={onCancel}
                />
              ) : null}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

/*eslint-disable react/prop-types*/
import React from "react";
import { Button } from "semantic-ui-react";
import { useFormikContext, FieldArray, useField } from "formik";

function queueModal({ context, ...others }) {
  return context.status.dispatch({type:'queueModal',...others})
}
export function ArrayPopupComponent({
  validate,
  name,
  summary,
  addButton,
  modalForm,
  initVars = () => ({}),
  initStatus = () => ({}),
  controlFlow,
  
}) {
  const formik=useFormikContext()
  const [field] = useField({ name, type: "select", validate });
  // end hooks
  const popup = async (vars) => {
    const values = await queueModal({
      context: formik,
      name: modalForm,
      vars,
      status: initStatus(formik)
    });
    return values
  }
  controlFlow = controlFlow || (({ value }) => popup(value))

  return (
    <FieldArray name={name}>
      {arrayhelpers => (
        <>
          {(field.value || []).map((value, index) =>
            summary({
              value,
              remove: () => arrayhelpers.remove(index),
              popup: async () => {
                const values = await controlFlow({ popup, value, ctx: formik, index })
                arrayhelpers.replace(index, values);
              }
            })
          )}
          {addButton ? (
            <div>
              <Button
                icon="add"
                type="button"
                as="a"
                onClick={evt => {
                  evt.preventDefault();
                  queueModal({
                    context: formik,
                    name: modalForm,
                    vars: initVars(formik),
                    status: initStatus(formik)
                  })
                    .then(result => {
                      arrayhelpers.push(result[0]);
                    })
                    .catch(() => {
                      return;
                    });
                }}
              />
            </div>
          ) : null}
        </>
      )}
    </FieldArray>
  );
}

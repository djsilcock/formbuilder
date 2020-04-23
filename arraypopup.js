/*eslint-disable react/prop-types*/
import React from "react";
import { Button } from "semantic-ui-react";
import { useFormContext } from "react-hook-forms";
import FormRow from "./FormRow";
export function ArrayPopupComponent({
  validate,
  name,
  summary,
  canAdd,
  ModalForm,
  onEditItem,
  initVars = () => ({}),
  initStatus = () => ({}),
  controlFlow,
}) {
  const formctx = useFormContext();
  const modalController = React.useRef(null);
  const editFunc = React.useCallback(
    (values) => {
      if (onEditItem) return onEditItem(values);
      if (!!ModalForm) return modalController.current.open(values);
    },
    [onEditItem, ModalForm]
  );
  const arrayhelpers = useFieldArray({ name });
  return (
    <>
      {arrayhelpers.fields.map((value, index) =>
        summary({
          value,
          remove: () => arrayhelpers.remove(index),
          popup: async () => {
            arrayhelpers.replace(index, await editFunc(value));
          },
        })
      )}
      {canAdd ? (
        <div>
          <Button
            icon="add"
            type="button"
            as="a"
            onClick={(evt) => {
              evt.preventDefault();
              editFunc(initVars())
                .then(arrayhelpers.append)
                .catch(() => {
                  return;
                });
            }}
          />
        </div>
      ) : null}
      {ModalForm
        ? React.cloneElement(ModalForm, { ref: modalController })
        : null}
    </>
  );
}
export function ArrayPopupField(props) {
  return <FormRow component={ArrayPopupComponent} {...props} />;
}

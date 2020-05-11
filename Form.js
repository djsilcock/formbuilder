import React from "react";
import { Form as SUIForm,Table,Button } from "semantic-ui-react";
import { useForm, FormContext } from "react-hook-form";
export const Form = React.forwardRef(function Form(
  {
    onSubmit,
    onCancel,
    submitContent = "Submit",
    submitIcon = "check",
    cancelContent = "Cancel",
    cancelIcon = "cancel",
    resetContent = "Reset",
    resetIcon = "undo",
    mode = "onSubmit",
    reValidateMode = "onChange",
    defaultValues = {},
    validationSchema = undefined, // Note: will be deprecated in the next major version with validationResolver
    validationResolver = undefined,
    validationContext = undefined,
    validateCriteriaMode = "firstErrorDetected",
    submitFocusError = true,
    children,
	action
  },
  ref
) {
  const formContext = useForm({
    mode,
    reValidateMode,
    defaultValues,
    validationSchema,
    validationResolver,
    validationContext,
    validateCriteriaMode,
    submitFocusError,
  });
  return (
    <FormContext {...formContext}>
      <SUIForm action={action} onSubmit={formContext.handleSubmit(onSubmit)}>
        <Table selectable>
          <Table.Body>{children}</Table.Body>
        </Table>
      </SUIForm>
      <Button icon={submitIcon} content={submitContent} type="submit" />
      <Button
        icon={resetIcon}
        content={resetContent}
        type="button"
        onClick={formContext.reset}
      />
      <Button
        icon={cancelIcon}
        content={cancelContent}
        type="button"
        onClick={onCancel}
      />
    </FormContext>
  );
});

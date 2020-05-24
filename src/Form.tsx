import React, { ReactNode, MutableRefObject } from "react";
import { Form as SUIForm, Table, Button } from "semantic-ui-react";
import { useForm, FormContext } from "react-hook-form";
import {
  DeepPartial,
  FormContextValues,
  UseFormOptions,
} from "react-hook-form";
import { update } from "lodash";
import PropTypes from "prop-types";

interface FormPropsCore {
  onSubmit(values: any): void;
  onCancel(): void;
  submitContent?: ReactNode;
  submitIcon?: string;
  cancelContent?: ReactNode;
  cancelIcon?: string;
  resetContent?: ReactNode;
  resetIcon?: string;

  children: any;
  action?: string;
}

interface FormPropsWithContext extends FormPropsCore {
  formContext: FormContextValues;
  defaultValues?: DeepPartial<Record<string, any>>;
}

interface FormPropsWithUFO extends FormPropsCore, UseFormOptions {}
type FormProps = FormPropsWithContext | FormPropsWithUFO;

function isFormPropsWithContext(props): props is FormPropsWithContext {
  return typeof props.formContext !== "undefined";
}
export const Form = (props: FormProps) => {
  const {
    onSubmit,
    onCancel,
    submitContent = "Submit",
    submitIcon = "check",
    cancelContent = "Cancel",
    cancelIcon = "cancel",
    resetContent = "Reset",
    resetIcon = "undo",
    children,
    action,
    defaultValues = {},
  } = props;

  const formContext = isFormPropsWithContext(props)
    ? props.formContext
    : useForm({
        mode: props.mode,
        reValidateMode: props.reValidateMode,
        defaultValues: props.defaultValues,
        validationSchema: props.validationSchema,
        validationResolver: props.validationResolver,
        validationContext: props.validationContext,
        validateCriteriaMode: props.validateCriteriaMode,
        submitFocusError: props.submitFocusError,
      });
  //<SUIForm action={action} onSubmit={formContext.handleSubmit(onSubmit)}>

  return (
    <FormContext {...formContext}>
      <SUIForm action={action} onSubmit={formContext.handleSubmit(onSubmit)}>
        <Table selectable>
          <Table.Body>{children}</Table.Body>
        </Table>
      </SUIForm>
      <Button
        icon={submitIcon}
        content={submitContent}
        type="submit"
        onClick={formContext.handleSubmit(onSubmit)}
      />
      <Button
        icon={resetIcon}
        content={resetContent}
        type="button"
        onClick={formContext.reset.bind(null, defaultValues)}
      />
      <Button
        icon={cancelIcon}
        content={cancelContent}
        type="button"
        onClick={onCancel}
      />
    </FormContext>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  submitContent: PropTypes.node,
  submitIcon: PropTypes.string,
  cancelContent: PropTypes.node,
  cancelIcon: PropTypes.string,
  resetContent: PropTypes.node,
  resetIcon: PropTypes.string,
  mode: PropTypes.oneOf(["onSubmit", "onChange", "onBlur"]),
  reValidateMode: PropTypes.oneOf(["onSubmit", "onChange", "onBlur"]),
  defaultValues: PropTypes.object,
  validationSchema: PropTypes.any, // Note: will be deprecated in the next major version with validationResolver
  validationResolver: PropTypes.func,
  validationContext: PropTypes.any,
  validateCriteriaMode: PropTypes.oneOf(["firstError", "all"]),
  submitFocusError: PropTypes.bool,
  children: PropTypes.node,
  action: PropTypes.string,
};

import React, { ReactNode } from "react";
import { Form as SUIForm, Table, Button } from "semantic-ui-react";
import { useForm, FormContext } from "react-hook-form";
import { Mode } from "react-hook-form";
import { update } from "lodash";
import PropTypes from "prop-types";

type ValidateMode = "firstError" | "all";

interface FormProps {
  onSubmit(): void;
  onCancel(): void;
  submitContent?: ReactNode;
  submitIcon?: string;
  cancelContent?: ReactNode;
  cancelIcon?: string;
  resetContent?: ReactNode;
  resetIcon?: string;
  mode?: Mode;
  reValidateMode?: Mode;
  defaultValues?: object;
  validationSchema?: any; // Note: will be deprecated in the next major version with validationResolver
  validationResolver?: any;
  validationContext?: any;
  validateCriteriaMode?: ValidateMode;
  submitFocusError?: boolean;
  children: any;
  action?: string;
}

const Form = React.forwardRef(
  (
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
      validateCriteriaMode = "firstError",
      submitFocusError = true,
      children,
      action,
    }: FormProps,
    ref: React.Ref<any>
  ) => {
    React.Children.forEach(children, (comp) => {
      update(
        defaultValues,
        comp.props.name,
        (defaultValue) =>
          defaultValue || comp.type.getDefaultValue?.(comp.props)
      );
    });
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
    //<SUIForm action={action} onSubmit={formContext.handleSubmit(onSubmit)}>
    React.useImperativeHandle(ref, () => formContext);
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
  }
);

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

const fRForm = React.forwardRef(Form as any);
export { fRForm as Form };

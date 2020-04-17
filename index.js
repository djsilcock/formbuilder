/*eslint-disable react/prop-types*/

import React, { useMemo } from "react";
import { setIn } from "formik";
import PropTypes from "prop-types";
import { RadioComponent, CheckboxComponent } from "./checkbox";
import { DatePickerComponent } from "./datepicker";
import { InputComponent, TextAreaComponent, HiddenComponent } from "./basic";
import { ArrayPopupComponent } from "./arraypopup";
import { DropdownComponent } from "./dropdown";
import { InnerFormContainer } from "./innerform";
import { ModalComponent } from "./modal";
import { merge } from "lodash";
import  FormRow  from "./FormRow";

function makeComponentList(formdef) {
  var formvalidate = undefined;
  const components = [];
  const effects = [];
  const listeners = {};
  const defaultValues = {};
  formdef.forEach(fielddef => {
    if (fielddef.name == "_") {
      formvalidate = fielddef.validation;
      return;
    }
    var Component = {
      text: InputComponent,
      textarea: TextAreaComponent,
      email: InputComponent,
      datepicker: DatePickerComponent,
      typeahead: DropdownComponent,
      radio: RadioComponent,
      checkbox: CheckboxComponent,
      hidden: HiddenComponent,
      arraypopup: ArrayPopupComponent,
      modal: ModalComponent
    }[fielddef.type];
    //eslint-disable-next-line no-undef
    if (fielddef.formdef) {
      fielddef.compiledformdef = makeComponentList(fielddef.formdef);
    }
    if (fielddef.effect) effects.push(fielddef.effect);
    if (fielddef.listener) {
      listeners[fielddef.listener.event] =
        listeners[fielddef.listener.event] || [];
      listeners[fielddef.listener.event].push(fielddef.listener.callback);
      if (Component?.listeners) merge(listeners, Component.listeners);
      return;
    }
    fielddef.validate = v =>
      fielddef.validation?.__isYupSchema__
        ? fielddef.validation.validate(v).then(
            () => undefined,
            e => e.message
          )
        : fielddef.validation?.(v);
    if (Component)
      components.push(
        <Component key={fielddef.name} {...fielddef} />
      );
    setIn(defaultValues, fielddef.name, fielddef.defaultvalue);
  });
  return { components, defaultValues, formvalidate, effects, listeners };
}

function FormContainer({ formdef, ...props }) {
  const compiledForm = useMemo(() => makeComponentList(formdef), [formdef]);
  return <InnerFormContainer formdef={compiledForm} {...props} />;
}

//FormContainer.propTypes = {
//  formdef: PropTypes.array,
//  onSubmit: PropTypes.func,
//  action: PropTypes.string,
//  children: PropTypes.any
//};
export default FormContainer;

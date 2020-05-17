import {
  Form,
  TextField,
  CheckboxField,
  RadioField,
  DropdownField,
  DatePickerField,
  //  ArrayPopupField,
  //  ModalComponent,
} from "../../";
import React from "react";

export default function TestForm() {
  return (
    <Form
      ref={(ref) => {
        window.formcontroller = ref;
      }}
      onSubmit={(values) => {
        window.formvalues = values;
      }}
      onCancel={() => {
        window.cancelled = true;
      }}
      submitContent="Submit"
      submitIcon="check"
      cancelContent="Cancel"
      cancelIcon="cancel"
      resetContent="Reset"
      resetIcon="undo"
      mode="onSubmit"
      reValidateMode="onChange"
      defaultValues={{}}
      validationSchema={undefined} // Note: will be deprecated in the next major version with validationResolver
      validationResolver={undefined}
      validationContext={undefined}
      validateCriteriaMode="firstErrorDetected"
      submitFocusError={true}
      action=""
    >
      <TextField label="single input" name="singleinput" />
      <TextField
        label="multiple input"
        multiline
        name="multipleinput"
        validate={{
          minLength: { value: 4, message: "Must be at least 4 characters" },
        }}
      />
      <CheckboxField
        label="checkbox"
        name="checkboxfield"
        options={[
          ["opt1", "CB Option 1"],
          ["opt2", "CB Option 2"],
        ]}
        validate={{
          minLength: { value: 1, message: "Must have at least 1 selected" },
          validate: (v) => {
            return `${v} is not acceptable`;
          },
        }}
      />
      <RadioField
        label="radio buttons"
        name="radiofield"
        options={[
          ["opt1", "Radio Option 1"],
          ["opt2", "Radio Option 2"],
        ]}
      />
      <DatePickerField label="date field" name="datefield" />
      <DropdownField
        label="single dropdown"
        name="singledropdown"
        options={[
          ["opt1", "SD Option 1"],
          ["opt2", "SD Option 2"],
        ]}
      />
      <DropdownField
        label="multiple dropdown"
        name="multidropdown"
        multiple
        options={[
          ["opt1", "MD Option 1"],
          ["opt2", "MD Option 2"],
        ]}
      />
    </Form>
  );
}

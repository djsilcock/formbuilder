import {
  Form,
  TextField,
  CheckboxField,
  RadioField,
  DropdownField,
  DatePickerField,
  ArrayPopupField,
  ModalComponent,
} from "../../";

export default function TestForm(props) {
  return (
    <Form
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
      <TextField label="multiple input" multiline name="multipleinput" />
      <CheckboxField
        label="checkbox"
        options={[
          ["opt1", "Option 1"],
          ["opt2", "Option 2"],
        ]}
      />
      <RadioField
        label="radio buttons"
        name="radiofield"
        options={[
          ["opt1", "Option 1"],
          ["opt2", "Option 2"],
        ]}
      />
      <DatePickerField label="date field" name="datefield" />
      <DropdownField
        label="single dropdown"
        name="singledropdown"
        options={[
          ["opt1", "Option 1"],
          ["opt2", "Option 2"],
        ]}
      />
      <DropdownField
        label="multiple dropdown"
        name="multidropdown"
        multiple
        options={[
          ["opt1", "Option 1"],
          ["opt2", "Option 2"],
        ]}
      />
    </Form>
  );
}

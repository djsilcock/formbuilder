import {
  Button,
  Form,
  Input as InputOriginal,
  TextArea as TextAreaOriginal,
  Radio,
  Checkbox,
  Dropdown,
  Modal,
} from "semantic-ui-react";

function Input({ refCallback, ...props }) {
  return (
    <InputOriginal
      ref={(r) => refCallback(r?.inputRef?.current || null)}
      {...props}
    />
  );
}

function TextArea({ refCallback, ...props }) {
  return (
    <TextAreaOriginal
      ref={(r) => refCallback(r?.ref?.current || null)}
      {...props}
    />
  );
}

export { Button, Form, Input, TextArea, Radio, Checkbox, Dropdown, Modal };

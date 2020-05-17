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
import React from "react";
import PropTypes from "prop-types";

function Input({ refCallback, ...props }) {
  return (
    <InputOriginal
      ref={(r) => refCallback(r?.inputRef?.current || null)}
      {...props}
    />
  );
}
Input.propTypes = { refCallback: PropTypes.func };

function TextArea({ refCallback, ...props }) {
  return (
    <TextAreaOriginal
      ref={(r) => refCallback(r?.ref?.current || null)}
      {...props}
    />
  );
}
TextArea.propTypes = { refCallback: PropTypes.func };

export { Button, Form, Input, TextArea, Radio, Checkbox, Dropdown, Modal };

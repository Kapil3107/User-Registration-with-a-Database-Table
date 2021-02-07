import React from "react";
import PropTypes from "prop-types";

import { Label, Input } from "reactstrap";

const FormInput = ({
  name,
  type,
  placeholder,
  onChange,
  className,
  value,
  label,
}) => {
  return (
    <React.Fragment>
      <Label htmlFor={name}>
        {label} <span className="asterisk">*</span>
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
      />
    </React.Fragment>
  );
};

FormInput.defaultProps = {
  type: "text",
  className: "",
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number", "password"]),
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

export default FormInput;

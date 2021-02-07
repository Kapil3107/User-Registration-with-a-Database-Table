import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import { connect } from "react-redux";
import { addInfo } from "../actions/infoActions";
import { clearErrors } from "../actions/errorActions";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import FormInput from "./FormInput";

class AppForm extends React.Component {
  state = {
    name: "",
    email: "",
    phoneNo: "",
    dateOfBirth: "",
    gender: "",
    education: "",
    checkBox: false,
    nameError: "",
    emailError: "",
    phoneNoError: "",
    dateOfBirthError: "",
    genderError: "",
    educationError: "",
    msg: "",
  };

  static propTypes = {
    addInfo: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.setState({
      checkBox: !this.state.checkBox,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    setTimeout(() => {
      this.props.clearErrors();
      this.setState({
        nameError: "",
        emailError: "",
        phoneNoError: "",
        dateOfBirthError: "",
        genderError: "",
        educationError: "",
        msg: "",
      });
    }, 500);
  };

  onChangeEducation = (e) => {
    this.setState({
      education: e.target.value,
    });
    setTimeout(() => {
      this.props.clearErrors();
      this.setState({ educationError: "", msg: "" });
    }, 500);
  };

  onChangeGender = (e) => {
    this.setState({
      gender: e.target.value,
    });
    setTimeout(() => {
      this.props.clearErrors();
      this.setState({ genderError: "", msg: "" });
    }, 500);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phoneNo,
      dateOfBirth,
      gender,
      education,
      checkBox,
    } = this.state;

    const newInfo = {
      name,
      email,
      phoneNo,
      dateOfBirth,
      gender,
      education,
      checkBox,
    };

    this.props.addInfo(newInfo);
  };

  componentDidUpdate = (prevProps) => {
    const { error } = this.props;
    const { name, email, phoneNo, dateOfBirth, gender, education } = this.state;

    if (this.props.info.msg === "Success") {
      this.props.history.push("/submit");
    }

    if (error !== prevProps.error) {
      let i = 0;

      if (name.trim() === "" || name.trim().length < 3) {
        this.setState({ nameError: error.errorMsg[i++] });
      }

      if (
        error.errorMsg[i] === "Server Error, Please try again!" ||
        error.errorMsg[i] === "Email already exists!"
      ) {
        this.setState({ msg: error.errorMsg[i++] });
      } else if (
        email.trim() === "" ||
        !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        this.setState({ emailError: error.errorMsg[i++] });
      }

      if (phoneNo === "") this.setState({ phoneNoError: error.errorMsg[i++] });

      if (dateOfBirth === "")
        this.setState({ dateOfBirthError: error.errorMsg[i++] });

      if (gender === "") this.setState({ genderError: error.errorMsg[i++] });

      if (education === "")
        this.setState({ educationError: error.errorMsg[i++] });
    }
  };

  render() {
    return (
      <Form
        action="/submit"
        method="post"
        enctype="multipart/form-data"
        onSubmit={this.handleSubmit}
      >
        {this.state.msg ? (
          <h4 style={{ color: "red", textAlign: "center" }}>
            {this.state.msg}
          </h4>
        ) : null}

        <FormGroup>
          <FormInput
            label="Name"
            name="name"
            type="text"
            id="name"
            placeholder="Enter your full name..."
            className={this.state.nameError ? "errorInput" : "successInput"}
            onChange={this.onChange}
          />
          <div className="errorStyle">{this.state.nameError}</div>
        </FormGroup>

        <FormGroup>
          <FormInput
            label="Email"
            name="email"
            type="text"
            id="email"
            placeholder="Enter full email..."
            className={this.state.emailError ? "errorInput" : "successInput"}
            onChange={this.onChange}
          />
          <div className="errorStyle">{this.state.emailError}</div>
        </FormGroup>

        <FormGroup>
          <FormInput
            label="Phone Number"
            name="phoneNo"
            type="text"
            id="phoneNo"
            placeholder="Enter your phone number..."
            className={this.state.phoneNoError ? "errorInput" : "successInput"}
            onChange={this.onChange}
          />
          <div className="errorStyle">{this.state.phoneNoError}</div>
        </FormGroup>

        <FormGroup>
          <FormInput
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            placeholder="date placeholder"
            className={
              this.state.dateOfBirthError ? "errorInput" : "successInput"
            }
            onChange={this.onChange}
          />
          <div className="errorStyle">{this.state.dateOfBirthError}</div>
        </FormGroup>

        <FormGroup>
          <Label for="gender">
            Gender <span className="asterisk">*</span>
          </Label>
          <Input
            type="select"
            name="gender"
            id="gender"
            className={this.state.genderError ? "errorInput" : "successInput"}
            onChange={this.onChangeGender}
          >
            <option value="">Please Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Input>
          <div className="errorStyle">{this.state.genderError}</div>
        </FormGroup>

        <FormGroup tag="fieldset" onChange={this.onChangeEducation}>
          <Label for="education">
            Education <span className="asterisk">*</span>
          </Label>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="education" value="Class 10" /> Class 10
              <sup>th</sup>
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="education" value="Class 12" /> Class 12
              <sup>th</sup>
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="education" value="Graduate" /> Graduate
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                invalid
                type="radio"
                name="education"
                value="Post-Graduate"
              />{" "}
              Post-Graduate
            </Label>
          </FormGroup>
          <div className="errorStyle">{this.state.educationError}</div>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={this.onClick} /> I agree to all the
            terms and conditions <span className="asterisk">*</span>
          </Label>
        </FormGroup>
        <br />
        {this.state.checkBox ? (
          <Button>Submit</Button>
        ) : (
          <Button disabled className="buttonStyleError">
            Submit
          </Button>
        )}
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  info: state.info,
  error: state.error,
});

export default connect(mapStateToProps, { addInfo, clearErrors })(
  withRouter(AppForm)
);

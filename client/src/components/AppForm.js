import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Alert } from 'reactstrap';

import { connect } from 'react-redux';
import { addInfo } from '../actions/infoActions';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

class AppForm extends React.Component {
    state = {
        name: '',
        email: '',
        phoneNo: null,
        dateOfBirth: '',
        gender: '',
        education: '',
        checkBox: false,
        nameError: '',
        emailError: '',
        phoneNoError: '',
        dateOfBirthError: '',
        genderError: '',
        educationError: '',
        msg: ''
    };

    static propTypes = {
        addInfo: PropTypes.func.isRequired,
        info: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired
    }

    onClick = () => {
        this.setState({
            checkBox: !this.state.checkBox
        })
    }

    setEducation = (e) => {
        this.setState({
            education: e.target.value
        });
        this.setState({ educationError: "" });
    }

    setGender = (e) => {
        this.setState({
            gender: e.target.value
        });

    }

    removeErrorGender = () => {
        this.setState({ genderError: "" });
    }

    removeErrorDOB = () => {
        this.setState({ dateOfBirthError: "" });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ nameError: "", emailError: "", phoneNoError: "", dateOfBirthError: "", genderError: "", educationError: "" });
    }

    nameValidation = () => {
        const { name } = this.state;

        let nameError = "";

        if (name.trim() === '') {
            nameError = "Name is required";
            this.setState({ nameError });
            return false;
        }

        if (/[^a-zA-Z -]/.test(name)) {
            nameError = "Invalid Characters";
            this.setState({ nameError });
            return false;
        }

        if (name.trim().length < 3) {
            nameError = "Name must contain at least three characters";
            this.setState({ nameError });
            return false;
        }

        return true;

    }

    emailValidation = () => {
        const { email } = this.state;

        let emailError = "";

        if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true;
        }

        if (email.trim() === '') {
            emailError = "Email is required";
            this.setState({ emailError });
            return false;
        }

        emailError = "Please enter a valid email";
        this.setState({ emailError });
        return false;
    }

    phoneValidation = () => {
        const { phoneNo } = this.state;

        let phoneNoError = "";

        if (phoneNo === null) {
            phoneNoError = "This field is required";
            this.setState({ phoneNoError });
            return false;
        }

        if (phoneNo != null && !(/^[0]?[789]\d{9}$/.test(phoneNo.toString()))) {
            phoneNoError = "Please enter a valid phone number";
            this.setState({ phoneNoError });
            return false;
        }

        return true;
    }

    dobValidation = () => {
        const { dateOfBirth } = this.state;

        let dateOfBirthError = "";

        if (dateOfBirth === '') {
            dateOfBirthError = "This field is required";
            this.setState({ dateOfBirthError });
            return false;
        }

        return true;
    }

    genderValidation = () => {
        const { gender } = this.state;

        let genderError = "";

        if (gender === '') {
            genderError = "This field is required";
            this.setState({ genderError });
            return false;
        }

        return true;
    }

    educationValidation = () => {
        const { education } = this.state;

        let educationError = "";

        if (education === '') {
            educationError = "This field is required";
            this.setState({ educationError });
            return false;
        }

        return true;
    }

    validate = () => {

        const nameVal = this.nameValidation();
        const emailVal = this.emailValidation();
        const phoneVal = this.phoneValidation();
        const dobVal = this.dobValidation();
        const genderVal = this.genderValidation();
        const educVal = this.educationValidation();

        if (nameVal && emailVal && phoneVal && dobVal && genderVal && educVal) {
            return true;
        }

        return false;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // validate
        const isValid = this.validate();

        // sending the info
        if (isValid) {
            const { name, email, phoneNo, dateOfBirth, gender, education, checkBox } = this.state;

            const newInfo = {
                name,
                email,
                phoneNo,
                dateOfBirth,
                gender,
                education,
                checkBox
            }

            this.props.addInfo(newInfo);
        }
    }

    componentDidUpdate = (prevProps) => {
        const { error } = this.props;

        if (this.props.info.msg === 'Success') {
            this.props.history.push('/submit');
        }

        if (error !== prevProps.error) {
            this.setState({ msg: error.msg.msg });
        }
    }

    render() {
        return (
            <Form action='/submit' method='post' enctype='multipart/form-data' onSubmit={this.handleSubmit}>
                {this.state.msg ? (<h4 style={{ color: 'red', textAlign: 'center' }}>{this.state.msg}</h4>) : null}
                <FormGroup class="form-input-material" style={{ marginTop: '30px' }}>
                    <Label for="name">Name <span style={{ color: 'red' }}>*</span></Label>
                    {
                        (this.state.nameError)
                            ?
                            <div>
                                <Input invalid type="text" name="name" id="name" placeholder="Enter full name" onChange={this.onChange} />
                                <FormFeedback>{this.state.nameError}</FormFeedback>
                            </div>
                            :
                            <div>
                                <Input type="text" name="name" id="name" placeholder="Enter full name" onChange={this.onChange} />
                            </div>
                    }
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email <span style={{ color: 'red' }}>*</span></Label>
                    {
                        (this.state.emailError)
                            ?
                            <div>
                                <Input invalid type="text" name="email" id="email" placeholder="Enter your email" onChange={this.onChange} />
                                <FormFeedback>{this.state.emailError}</FormFeedback>
                            </div>
                            :
                            <div>
                                <Input type="text" name="email" id="email" placeholder="Enter your email" onChange={this.onChange} />
                            </div>
                    }
                </FormGroup>


                <FormGroup>
                    <Label for="phoneNumber">Phone Number <span style={{ color: 'red' }}>*</span></Label>
                    {
                        (this.state.phoneNoError)
                            ?
                            <div>
                                <Input invalid type="phoneNo" name="phoneNo" id="phoneNo" placeholder="Enter your phone number" onChange={this.onChange} />
                                <FormFeedback>{this.state.phoneNoError}</FormFeedback>
                            </div>
                            :
                            <div>
                                <Input type="phoneNo" name="phoneNo" id="phoneNo" placeholder="Enter your phone number" onChange={this.onChange} />
                            </div>
                    }
                </FormGroup>

                <FormGroup onMouseOver={this.removeErrorDOB}>
                    <Label for="date of birth">Date of Birth <span style={{ color: 'red' }}>*</span></Label>
                    {
                        (this.state.dateOfBirthError)
                            ?
                            <div>
                                <Input
                                    invalid
                                    type="date"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    placeholder="date placeholder"
                                    onChange={this.onChange}
                                />
                                <FormFeedback>{this.state.dateOfBirthError}</FormFeedback>
                            </div>
                            :
                            <Input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                placeholder="date placeholder"
                                onChange={this.onChange}
                            />
                    }
                </FormGroup>

                <FormGroup onMouseOver={this.removeErrorGender} value={this.state.value}>
                    <Label for="gender">Gender <span style={{ color: 'red' }}>*</span></Label>
                    {
                        (this.state.genderError)
                            ?
                            <div>
                                <Input invalid type="select" name="gender" id="gender" onChange={this.setGender}>
                                    <option value="Select">Please Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Input>
                                <FormFeedback>{this.state.genderError}</FormFeedback>
                                <div></div>
                            </div>
                            :
                            <Input type="select" name="gender" id="gender" onChange={this.setGender}>
                                <option value="Select">Please Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Input>
                    }
                </FormGroup>

                <FormGroup tag="fieldset" onChange={this.setEducation}>
                    <Label for="education">Education <span style={{ color: 'red' }}>*</span></Label>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="education" value="Class 10" />{' '}
                            Class 10<sup>th</sup>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="education" value="Class 12" />{' '}
                            Class 12<sup>th</sup>
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="education" value="Graduate" />{' '}
                            Graduate
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input invalid type="radio" name="education" value="Post-Graduate" />{' '}
                            Post-Graduate
                        </Label>
                    </FormGroup>
                    <div style={{ marginTop: '2px', color: 'red', fontSize: '13px' }}>{this.state.educationError}</div>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" onClick={this.onClick} /> I agree to all the terms and conditions <span style={{ color: 'red' }}>*</span>
                    </Label>
                </FormGroup>
                <br />
                {
                    (this.state.checkBox)
                        ?
                        <Button style={{ marginBottom: '70px' }}>Submit</Button>
                        :
                        <Button disabled style={{ marginBottom: '70px', cursor: 'not-allowed', pointerEvents: 'all !important' }}>Submit</Button>
                }
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    info: state.info,
    error: state.error
});

export default connect(mapStateToProps, { addInfo })(withRouter(AppForm));
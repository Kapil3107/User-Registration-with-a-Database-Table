import React, { Component } from 'react'
import './Submit.css';
import Register_Success from './images/Register_Success.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { withRouter } from 'react-router-dom';

class Submit extends Component {
    onClick1 = () => {
        this.props.history.push('/users');
    }

    onClick2 = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="mainBody">
                <div class="body"></div>
                <div class="chat">
                    <div class="profile">
                        <img src={Register_Success} alt='' />
                    </div>
                    <div class="message">
                        Hurray! You have successfully registered
                    </div>
                    <div class="user">
                        <a className="a" onClick={this.onClick2}><FontAwesomeIcon icon={['fas', 'angle-double-left']} /> Go back to the register page</a>
                        <br></br>
                        <a className="a" onClick={this.onClick1}><FontAwesomeIcon icon={['fas', 'angle-double-right']} /> See all the registered users</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Submit);
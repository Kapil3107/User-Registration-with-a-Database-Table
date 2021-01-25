import React, { Component } from 'react'
import './Submit.css';
import Register_Success from './images/Register_Success.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Submit extends Component {
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
                        <a href="/"><FontAwesomeIcon icon={['fas', 'angle-double-left']} /> Go back to the register page</a>
                        <br></br>
                        <a href="/users"><FontAwesomeIcon icon={['fas', 'angle-double-right']} /> See all the registered users</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Submit;
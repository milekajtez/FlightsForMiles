import React, { useState } from 'react'
import Help from './help/Help'
import Login from './logging-in/Login'
import Registration from './registration/Registration'

//import { GoogleLogin } from 'react-google-login';

function Navigation() {
    const [helpIsOpen, setHelpIsOpen] = useState(false)
    const [loginIsOpen, setLoginIsOpen] = useState(false)
    const [regIsOpen, setRegIsOpen] = useState(false)

    /*const responseGoogle = (response) => {
        console.log(response);
    }

    const responseErrorGoogle = (response) => {
        console.log(response);
    }*/

    return (
        <span>
            <ul className="menu-bar">
                <li><i className="fas fa-plane-departure"></i> Flights</li>
                <div></div>
                <li onClick={() => setHelpIsOpen(true)}><i className="far fa-question-circle"></i> Help</li>
                <Help helpIsOpen={helpIsOpen} setHelpIsOpen={setHelpIsOpen} />
                <div></div>
                <li><i className="fab fa-google"></i>
                    {/*<GoogleLogin
                        clientId="204173179640-u087p5rhifds30i6u1nt21kragpe893b.apps.googleusercontent.com"
                        render={renderProps => (
                            <span onClick={renderProps.onClick} disabled={renderProps.disabled}> Login with Google</span>
                          )}
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseErrorGoogle}
                        isSignedIn={true}
                        />*/} Login with Google</li>
                <div></div>
                <li onClick={() => setLoginIsOpen(true)}><i className="fas fa-sign-in-alt"></i> Sign in</li>
                <Login loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen} />
                <div></div>
                <li onClick={() => setRegIsOpen(true)}><i className="fas fa-user-plus"></i> Sign up</li>
                <Registration regIsOpen={regIsOpen} setRegIsOpen={setRegIsOpen} />
            </ul>
        </span>
    )
}

export default Navigation

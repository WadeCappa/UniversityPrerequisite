import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SessionController from '../../controllers/session/SessionController';

function Login() {
    // part of the logic engine needs to manage the state of these forms (just the sending part)
    const [state, setState] = useState({email: "", password: ""})

    return (
        <div className='header'>
            <form>
                <div>
                    <label>Email:
                        <input type="text" 
                            onChange={(event) => setState({...state, email: event.target.value})}
                        />
                    </label>
                </div>
                <div>
                    <label>password:
                        <input type="password" 
                            onChange={(event) => setState({...state, password: event.target.value})}
                        />
                    </label>
                </div>
            </form>
            <button className='slot' onClick={() => {
                // call API, if user exists return JWT, else return error 
                // wait for API response
                    // if JWT 
                        // save JWT as a cookie. 
                        // Then push onto react router history the home screen
                    // else display error, do nothing else. 
                SessionController.login(state.email, state.password)
            }}>
                login
            </button>
            <Link style={{marginLeft:10}} to={"/signup"}>
                <button className='slot'>
                    Create Account?
                </button>
            </Link>
        </div>
    )
  }

export default Login;
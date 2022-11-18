import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SessionController from '../../controllers/session/SessionController';

function Signup() {
  // part of the logic engine needs to manage the state of these forms (just the sending part)
  const [state, setState] = useState({email: "", password: "", confirmPassword: ""})

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
              <div>
                  <label>confirm password:
                      <input type="password" 
                          onChange={(event) => setState({...state, confirmPassword: event.target.value})}
                      />
                  </label>
              </div>
          </form>
          <button className='slot' onClick={() => {
              if (state.confirmPassword === state.password) {
                SessionController.signin(state.email, state.password)
              }
          }}>
              Create Account
          </button>
          <Link style={{marginLeft:10}} to={"/login"}>
              <button className='slot'>
                  login
              </button>
          </Link>
      </div>
  )
}

export default Signup; 
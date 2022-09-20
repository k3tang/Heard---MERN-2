import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const usernameSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)); 
  }

  return (
    <form className="session-form" onSubmit={usernameSubmit}>
      <h2>Sign Up Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        Email   </label> <br />
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
    
      <div className="errors">{errors?.username}</div>
      <label>
        Username     </label> <br />
        <input type="text"
          value={username}
          onChange={update('username')}
          placeholder="Username"
        />
  
      <div className="errors">{errors?.password}</div>
      <label>
        Password  </label> <br />
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
     
      <div className="errors">
        {password !== password2 && 'Confirm Password field must match'}
      </div>
      <label>
        Confirm Password  </label> <br />
        <input type="password"
          value={password2}
          onChange={update('password2')}
          placeholder="Confirm Password"
        />
    
      <input
        type="submit"
        value="Sign Up"
        disabled={!email || !password || password !== password2}
      />
    </form>
  );
}

export default SignupForm;
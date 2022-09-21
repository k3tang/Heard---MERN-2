import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';

import { login, clearSessionErrors } from '../../store/session';
import { useHistory } from 'react-router-dom';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state=>state.session.user) 

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login({email: "demo@test.com", password: "password"}));
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Log In Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        Email     </label> <br />
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />

      <div className="errors">{errors?.password}</div>
      <label>
        Password </label> <br />
        <input type="password"
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
    
      <input
        type="submit"
        value="Log In"
        disabled={!email || !password}
      />
      <div className='demo-login' onClick={demoLogin}>Login as Demo User</div>
      <div className="signup-link" onClick={() => history.push("/signup")}>Don't have an account?</div>
    </form>
  );
}

export default LoginForm;
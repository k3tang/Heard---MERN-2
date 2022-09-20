import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state=>state.session.user) 
 // this is a special note
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
    </form>
  );
}

export default LoginForm;
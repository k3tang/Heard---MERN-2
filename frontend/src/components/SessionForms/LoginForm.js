import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { login, clearSessionErrors } from "../../store/session";
import { useHistory } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: "demo@test.com", password: "password" }));
  };

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="form-container">
      <div className="session-form-container">
        <h2 className="form-header">Welcome back!</h2>
        <form className="session-form" onSubmit={handleSubmit}>
          <div className="login-input">
            <div className="errors">{errors?.email}</div>
            {/* <label className='session-form-title'>
            Email     </label> <br /> */}
            <input
              type="text"
              value={email}
              onChange={update("email")}
              placeholder="Email"
              className="form-input"
            />
            {/* <span class="focus-bg"></span> */}

            <div className="errors">{errors?.password}</div>
            {/* <label className='session-form-title'>
            Password </label> <br /> */}
            <input
              type="password"
              value={password}
              onChange={update("password")}
              placeholder="Password"
              className="form-input"
            />
          </div>
          <input
            type="submit"
            value="Log In"
            disabled={!email || !password}
            className="session-form-submit-button"
          />
          <div className="demo-login" onClick={demoLogin}>
            Login as Demo User
          </div>
          <div className="signup-link" onClick={() => history.push("/signup")}>
            Don't have an account?
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

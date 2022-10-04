import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { signup, clearSessionErrors } from "../../store/session";
import { useHistory } from "react-router-dom";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emptyErrors, setEmptyErrors] = useState(false);
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const usernameSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };

    if(!email || !username || !password) {
      setEmptyErrors(true)
    } else {
      setEmptyErrors(false)
      dispatch(signup(user));
    }


  };

  return (
    <div className="form-container">
      <div className="session-form-container">
        <h2 className="form-header">Sign up with us!</h2>
        <form className="session-form" onSubmit={usernameSubmit}>
          <div className="errors">{errors?.email}</div>
          {/* <label className='session-form-title'>
            Email   </label> <br /> */}
          <input
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
            className="form-input"
          />
          <div className="errors">{errors?.username}</div>
          {/* <label className='session-form-title'>
            Username     </label> <br /> */}
          <input
            type="text"
            value={username}
            onChange={update("username")}
            placeholder="Username"
            className="form-input"
          />
          <div className="errors">{errors?.password}</div>
          {/* <label className='session-form-title'>
            Password  </label> <br /> */}
          <input
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
            className="form-input"
          />
          <div className="errors">
            {password !== password2 && "Confirm Password field must match"}
          </div>
          {/* <label className='session-form-title'>
            Confirm Password  </label> <br /> */}
          <input
            type="password"
            value={password2}
            onChange={update("password2")}
            placeholder="Confirm Password"
            className="form-input"
          />{" "}
          <br />
          {emptyErrors &&
          <div className="errors">Please Fill Out All Fields</div>}
          <input
            type="submit"
            value="Sign Up"
            // disabled={!email || !password || password !== password2}
            className="session-form-submit-button"
          />
          <div className="login-link" onClick={() => history.push("/login")}>
            Already have an account?
          </div>
          <div className="about-link" onClick={() => history.push("/about")}>
            About the Creators
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;

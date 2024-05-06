import React, { Fragment, useState } from "react";
import "./LoginSignup.css";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/userAction";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Loader from "../Loader/Loader";

const LoginSignup = ({ isRegisterFormOpen, isLoginFormOpen, onClose }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { loading, loginError, registerError } = useSelector(
    (state) => state.user
  );

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
  });
  const handleLoginFormChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  const handleRegisterFormChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const loginFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginFormData));
    setLoginFormData("");
    dispatch(onClose);
  };

  const registerFormSubmit = (e) => {
    e.preventDefault();
    dispatch(register(registerFormData));
    setRegisterFormData("");
    dispatch(onClose);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isRegisterFormOpen && (
            <>
              <div className="modal-backdrop" onClick={onClose}></div>
              <div className="formContainer">
                <div>
                  <button onClick={onClose} className="formCloseBtn">
                    X
                  </button>
                </div>
                <h2 className="formHeading">Register to Swip Story</h2>
                <div>
                  <form onSubmit={registerFormSubmit} className="form">
                    <div className="inputContainer">
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder="Enter username"
                        value={registerFormData.username}
                        name="username"
                        onChange={handleRegisterFormChange}
                        className="inputField"
                      />
                    </div>

                    <div className="inputContainer">
                      <label>Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={registerFormData.password}
                        name="password"
                        onChange={handleRegisterFormChange}
                        className="inputField"
                      />
                      <div
                        className="showingPassword"
                        onClick={togglePasswordVisibility}
                      >
                        {!showPassword ? <GoEye /> : <GoEyeClosed />}
                      </div>
                    </div>
                    {registerError && (
                      <div className="errorContainer ">
                        <p className="error">{registerError}</p>
                      </div>
                    )}
                    <div className="buttonContainer">
                      <button type="submit">Register</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
          {isLoginFormOpen && (
            <>
              <div className="modal-backdrop" onClick={onClose}></div>
              <div className="formContainer">
                <div>
                  <button onClick={onClose} className="formCloseBtn">
                    X
                  </button>
                </div>
                <h2 className="formHeading">Login to Swip Story</h2>
                <div>
                  <form onSubmit={loginFormSubmit} className="form">
                    <div className="inputContainer">
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder="Enter username"
                        value={loginFormData.username}
                        name="username"
                        onChange={handleLoginFormChange}
                        className="inputField"
                      />
                    </div>

                    <div className="inputContainer">
                      <label>Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={loginFormData.password}
                        name="password"
                        onChange={handleLoginFormChange}
                        className="inputField"
                      />
                      <div
                        className="showingPassword"
                        onClick={togglePasswordVisibility}
                      >
                        {!showPassword ? <GoEye /> : <GoEyeClosed />}
                      </div>
                    </div>
                    {loginError && (
                      <div className="errorContainer ">
                        <p className="error">{loginError}</p>
                      </div>
                    )}
                    <div className="buttonContainer">
                      <button type="submit">Login</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Fragment>
  );
};

export default LoginSignup;

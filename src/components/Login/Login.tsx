import * as React from "react";
import { Spinner } from "../../widgets";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const usernameRef = React.useRef<HTMLInputElement>(null);

  const getUserInfoFromStorage = () => {
    const userName = localStorage.getItem("userName");
    return userName;
  };

  const setLoggedInUserAndNavigateToDashboard = () => {
    setIsUserLoggedIn(true);
    navigate("/dashboard");
  };

  React.useEffect(() => {
    setLoading(true);
    const userName = getUserInfoFromStorage();
    if (userName !== null) {
      setLoggedInUserAndNavigateToDashboard();
    }
    setLoading(false);
  }, []);

  const loginHandler = () => {
    const userName = usernameRef.current?.value;
    if (userName) {
      localStorage.setItem("userName", userName.trim());
      setLoggedInUserAndNavigateToDashboard();
    }
  };

  const renderLoginForm = () => {
    return (
      <div className="container">
        <h1>Please login to Trello board</h1>
        <form className="form">
          <div className="form-group">
            <label htmlFor="usernameInput" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              aria-describedby="username"
              placeholder="Enter username"
              ref={usernameRef}
              autoFocus
              autoComplete="off"
              data-testid="usernameInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Password"
              autoComplete="off"
              data-testid="passwordInput"
              required
            />
          </div>
          <button type="button" className="login-button" onClick={loginHandler} data-testid="login-btn">
            Login
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      {loading && <Spinner id="spinner" />}
      {!loading && !isUserLoggedIn && renderLoginForm()}
    </>
  );
};

export { Login };

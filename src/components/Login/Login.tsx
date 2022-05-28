import * as React from "react";
import { Spinner } from "../../widgets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const getUserInfoFromStorage = () => {
    const userName = localStorage.getItem("userName");
    return userName;
  };

  React.useEffect(() => {
    setLoading(true);
    const userName = getUserInfoFromStorage();
    if (userName !== null) {
      setIsUserLoggedIn(true);
      navigate("/dashboard");
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Spinner id="spinner" />}
      {!loading && !isUserLoggedIn && <div>Login Page</div>}
    </>
  );
};

export { Login };

import { useEffect, useState } from "react";
import ChatApp from "@/components/ChatApp";
import {
  setToken,
  getToken,
  getUser,
  setUser,
  clearAuthData,
} from "../utils/auth";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useNotifications } from "@/hooks/useNotifications";

import { useSelector, useDispatch } from "react-redux";
import { setInitialValue, login, logout } from "../slices/authSlice";
import AccountDetails from "@/components/AccountDetails";
import { selectTheme } from "@/slices/globalSettingsSlice";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) =>
    state.auth.token !== null ? true : false
  );

  const theme = useSelector(selectTheme);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [tab, setTab] = useState("login"); // login or register

  const dispatch = useDispatch();
  const { notify } = useNotifications();

  useEffect(() => {
    const t = getToken();
    const u = getUser();

    if (t && u) {
      dispatch(setInitialValue({ token: t, user: u, isAuthenticated: true }));
    }
  }, [dispatch]);

  useEffect(() => {
    setToken(token);
    setUser(user);
    // setIsAuthenticated(token ? true : false);
  }, [token, user]);

  const signIn = async (e) => {
    if (e.token) {
      dispatch(login(e));
      notify("Congrats you enabled notifications!");
    } else {
      setShowError(true);
      setErrors(e.errors);
    }
  };
  const register = async (e) => {
    if (e.message === "User created") {
      signIn(e);
    } else {
      alert(e.message);
    }
  };

  const exitAccount = () => {
    dispatch(logout());
    clearAuthData();
    setSelectedRoom(null);
  };

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div
          className="register-container"
          style={{ backgroundImage: "url(/images/bg.webp)" }}
        >
          <div className={`register-card${theme}`}>
            {showError && (
              <div className="error-container">
                <ul>
                  {errors.map((error) => (
                    <li key={error}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}

            <h1 className={`title ${theme}`}>
              {tab === "login" ? "Login" : "Register"}
            </h1>
            {tab === "login" ? (
              <LoginForm onLogin={signIn} onError={setErrors} />
            ) : (
              <RegisterForm onRegister={register} onError={setErrors} />
            )}
            <p className={theme}>
              {tab === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                className="link"
                onClick={() => setTab(tab === "login" ? "register" : "login")}
              >
                {tab === "login" ? "Create one" : "Login"}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <ChatApp user={user} loggedOut={exitAccount} />
      )}
    </div>
  );
};

export default Home;

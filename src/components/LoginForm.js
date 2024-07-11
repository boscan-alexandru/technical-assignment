import { selectTheme } from "@/slices/globalSettingsSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
const LoginForm = ({ onLogin, onError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useSelector(selectTheme);

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.errors) {
      onError(data.errors);
    }
    onLogin(data);
  };
  return (
    <form className="grid gap-3">
      <input
        type="email"
        placeholder="Email"
        className={`input ${theme}`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className={`input ${theme}`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="main-btn" onClick={submit}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;

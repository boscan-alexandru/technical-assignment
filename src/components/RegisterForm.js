import { useState } from "react";
import FileUpload from "./FileUpload";
import { useSelector } from "react-redux";
import { selectTheme } from "@/slices/globalSettingsSlice";
const RegisterForm = ({ onRegister, onError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState(null);
  const theme = useSelector(selectTheme);

  const handleFileUpload = (file) => {
    setAvatar(file);
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", avatar);
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.errors) {
      onError(data.errors);
    }
    onRegister(data);
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
      <FileUpload onUploaded={handleFileUpload} />
      <button className="main-btn" onClick={submit}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

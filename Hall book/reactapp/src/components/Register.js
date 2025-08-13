import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Registration Successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 3000);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="register-btn">Register</button>
        </form>
        {message && (
          <p className={`message ${message.includes("Successful") ? "success" : "error"}`}>
            {message}
          </p>
        )}
        <p onClick={() => navigate("/login")} className="link-text">
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";


const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      setMessage("Login Successful!");
      setIsAuthenticated(true);
      setTimeout(() => navigate("/hall-booking"), 1000);  // Redirect to HallBookingSystem
    } else {
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className="login-btn">Login</button>
        </form>
        {message && (
          <p className={`message ${message.includes("Successful") ? "success" : "error"}`}>
            {message}
          </p>
        )}
        <p onClick={() => navigate("/register")} className="link-text">
          Go to Register
        </p>
      </div>
    </div>
    
  );
};

export default Login;

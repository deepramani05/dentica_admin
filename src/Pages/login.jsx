import React, { useEffect, useState } from "react";
import "../css/style.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/userForm")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData && email === userData.email && password === userData.pass) {
      console.log("Login successful");
      // Here you can redirect or perform any actions for successful login
    } else {
      setError("Incorrect email or password.");
    }
    // Reset the form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="login-box" style={{ margin: "50px auto" }}>
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b>Admin</b> Login
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"} // Ternary operator to toggle input type
                  className="form-control"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
              </div>
              <div style={{margin:"30px 10px"}}>
                <div className="input-group-append">
                </div>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <input
                      type="checkbox"
                      onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                    />
                    <span style={{marginLeft:"10px",fontSize:"15px"}}>Show Password</span>
                  </div>
                </div>
              </div>
              {error && <div className="text-danger">{error}</div>}
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

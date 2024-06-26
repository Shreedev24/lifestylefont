import React, { Component } from "react";
import md5 from "md5";
import Home from "./Home"; // Import the Home component to be able to render it on successful login

class Login extends Component {
  state = {
    password: "",
    isAuthenticated: false,
    errorMessage: "",
  };

  handlePasswordChange = (event) => {
    event.preventDefault();
    // Example pre-hashed password using MD5. Replace "your-static-password" with your actual password.
    const hashedPassword = md5("Indcr@2026");
    if (md5(document.getElementById("password").value) === hashedPassword) {
      localStorage.setItem("isAuthenticated", true);
      location.reload();
    } else {
      this.setState({ errorMessage: "Invalid Password. Try again." });
    }
  };

  // handleSubmit = (event) => {};

  renderLoginForm = () => {
    return (
      <div style={styles.container}>
        <form style={styles.form}>
          <label style={styles.label}>
            Password:
            <input id="password" type="password" style={styles.input} />
          </label>
          <button
            type="submit"
            onClick={this.handlePasswordChange}
            style={styles.button}
          >
            Login
          </button>
          {this.state.errorMessage && (
            <p style={styles.error}>{this.state.errorMessage}</p>
          )}
        </form>
      </div>
    );
  };

  render() {
    return localStorage.getItem("isAuthenticated") ? (
      <Home />
    ) : (
      this.renderLoginForm()
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f2f2f2",
  },
  form: {
    width: "300px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  label: {
    display: "block",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "#ff0000",
    marginTop: "10px",
    textAlign: "center",
  },
};

export default Login;

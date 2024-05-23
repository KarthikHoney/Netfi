import { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showErrorMsg: false,
    errorMsg: "",
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, {
      expire: 30,
      path: "/",
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showErrorMsg: true, errorMsg });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onChangeUser = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePass = (event) => {
    this.setState({ password: event.target.value });
  };

  renderUserName = () => {
    const { username } = this.state;
    return (
      <div className="user">
        <label htmlFor="user" className="userLabel">
          Username
        </label>
        <input
          id="user"
          type="text"
          value={username}
          className="userInput"
          onChange={this.onChangeUser}
          placeholder="Enter username"
        />
      </div>
    );
  };

  renderPassword = () => {
    const { password } = this.state;
    return (
      <div className="user">
        <label htmlFor="pass" className="userLabel">
          Password
        </label>
        <input
          id="pass"
          type="password"
          className="userInput"
          value={password}
          onChange={this.onChangePass}
          placeholder="Enter password"
        />
      </div>
    );
  };

  render() {
    const { showErrorMsg, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Navigate to="/" />;
    }

    return (
      <div className="MC">
        <div>
          <img
            src="https://res.cloudinary.com/dceanjhp6/image/upload/f_auto,q_auto/im7fouox4t2rpwopswma"
            alt="movie"
            className="movieLogo"
          />
        </div>
        <div className="main">
          <form onSubmit={this.onSubmitForm}>
            <div className="sub">
              <h1 id="heading">Login</h1>
              {this.renderUserName()}
              {this.renderPassword()}
              <button type="submit" className="userInputB">
                Login
              </button>
              {showErrorMsg && <p className="para">{errorMsg}</p>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;

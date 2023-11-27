import React, { useState } from "react";
import recipeDB from "../../apis/recipeDB";
import { withRouter } from "react-router";
import "./login.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function loginForm(props) {
  const history = useHistory();
  if (localStorage.getItem("login_recipe_recommender")) {
    props.history.push("/home");
  }

  const [state, setState] = useState({
    username: "",
    password: "",
    successMessage: null,
    failMessage: null,
  });

  const changeValue = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    const stateTemp = {
      username: state.username,
      password: state.password,
    };
    const response = await recipeDB.post("/signIn", stateTemp).catch((err) => {
      console.log(err, err.message);
    });
  
    if (response && response.data.token) {
      setState((prevState) => ({
        ...prevState,
        successMessage: "Login successful. Redirecting to home page..",
        failMessage: null,
      }));
      localStorage.setItem("login_recipe_recommender", state.username);
      document.cookie = `token=${response.data.token}; max-age=${7 * 24 * 60 * 60}`;
      props.setLoginFlag(); // Corrected the function call
      props.history.push("/home");
    } else {
      setState((prevState) => ({
        ...prevState,
        failMessage: "Login unsuccessful. Please try again.",
        successMessage: null,
      }));
    }
  };
  

  return (
    <MainContainer>
      <div id="parent" style={{ height: "100%" }}>
        <StyledForm id="form_login">
          <div>
            <StlyedH1>SIGN IN</StlyedH1>
            <label>Username</label>
            <input
              type="text"
              id="username"
              value={state.username}
              onChange={changeValue}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={changeValue}
            />
          </div>
          <br />
          <button
            className="login-btn"
            type="button"
            id="submit-btn"
            onClick={submitLogin}
          >
            Submit
          </button>
          <br />
          <br />
          {state.successMessage ? (
            <div style={{ color: "green" }}>{state.successMessage}</div>
          ) : null}
          {state.failMessage ? (
            <div style={{ color: "red" }}>{state.failMessage}</div>
          ) : null}

          <i>
            <StyledLink onClick={() => history.push("/sign-up")}>
              Sign-Up
            </StyledLink>{" "}
            instead!
          </i>
        </StyledForm>
      </div>
    </MainContainer>
  );
}
export default withRouter(loginForm);

const StlyedH1 = styled.h1`
  margin-top: 12px;
`;

const MainContainer = styled.div`
  height: 100vh;
  overflow-y: hidden;
`;

const StyledForm = styled.form`
  width: 50%;
  margin: auto;
  background-color: #eee;
  padding: 32px;
  vertical-align: middle;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.95);
`;

const StyledLink = styled.a`
  color: #ff5252;
  cursor: pointer;
`;

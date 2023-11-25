import React, { useState } from "react";
import recipeDB from "../../apis/recipeDB";
import { withRouter } from "react-router";
import "./login.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function signupForm(props) {
  const history = useHistory();
  if (sessionStorage.getItem("login_recipe_recommender")) {
    props.history.push("/home");
  }

  const [state, setState] = useState({
    username: "",
    password: "",
    c_password: "",
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
      c_password: state.c_password
    };
    if(state.password != state.c_password){
      setState((prevState) => ({
        ...prevState,
        failMessage: "Passswords do not match. Please try again.",
        successMessage: null,
      }));
    }else{
      const response = await recipeDB.post("/signUp", stateTemp).catch((err) => {
        console.log(err, err.message);
      });
      if (response) {
        setState((prevState) => ({
          ...prevState,
          successMessage: "Sign Up successful. Redirecting to home page..",
          failMessage: null,
        }));
        sessionStorage.setItem("login_recipe_recommender", state.username);
        props.setLoginFlag;
        props.history.push("/login");
      } else {
        setState((prevState) => ({
          ...prevState,
          failMessage: "Sign Up unsuccessful. Please try again.",
          successMessage: null,
        }));
      }
    }
    
  };

  return (
    <MainContainer>
      
      <div id="parent" style={{ height: "100%" }}>
        <StyledForm id="form_login">
          <div>
            <StlyedH1>SIGN UP</StlyedH1>
            <div class="signupLable">
              <label style={{ maxWidth: "250px" }}>Username</label>
            </div>
            <div class="signupInput">
              <input
                type="text"
                id="username"
                value={state.username}
                onChange={changeValue}
              />
            </div>
          </div>
          <div class="clear">
            <div class="signupLable">
              <label  style={{ maxWidth: "250px" }}>Password</label>
            </div>
            <div class="signupInput">
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={changeValue}
            />
            </div>
          </div>
          <div class="clear">
            <div class="signupLable">
              <label  style={{ maxWidth: "250px" }}>Confirm Password</label>
            </div>            
            <div class="signupInput">
              <input
                type="password"
                id="c_password"
                value={state.c_password}
                onChange={changeValue}
              />
            </div>
            
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
            <StyledLink onClick={() => history.push("/login")}>
              Sign-In
            </StyledLink>{" "}
            instead!
          </i>
        </StyledForm>
      </div>
    </MainContainer>
  );
}
export default withRouter(signupForm);

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

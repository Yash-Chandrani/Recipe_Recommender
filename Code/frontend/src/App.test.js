import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import React from "react";
import "jest-localstorage-mock";
import { MemoryRouter } from "react-router-dom";
import Signup from "./pages/auth/signup";

describe("Testing for the App components ... ", () => {
  it("login form testing ...", () => {
    const renderData = render(<App />);

    const linkElement2 = renderData.getByTestId(/login_form/);
    expect(linkElement2).toHaveTextContent("SIGN IN");
    expect(linkElement2).toHaveTextContent("Username");
    expect(linkElement2).toHaveTextContent("Password");
    expect(linkElement2).toHaveTextContent("Submit");
  });
  it("Signup form testing ...", () => {
    const renderData = render(
      <MemoryRouter>
        <Signup setLoginFlag={() => {}} />
      </MemoryRouter>,
    );
    const linkElement1 = renderData.getByTestId(/signup_form/);
    expect(linkElement1).toHaveTextContent("SIGN UP");
    expect(linkElement1).toHaveTextContent("Username");
    expect(linkElement1).toHaveTextContent("Password");
    expect(linkElement1).toHaveTextContent("Confirm Password");
    expect(linkElement1).toHaveTextContent("Submit");
  });
});

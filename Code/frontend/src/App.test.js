import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";


test("renders Recipe link", () => {
  render(<App />);
  const linkElement = screen.queryByText(/Recipe/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders Recommender link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Recommender/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders Email link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders Ingredient link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Ingredient/i);
  expect(linkElement).toBeInTheDocument();
});
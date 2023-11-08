import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../containers/Home.js";
import { TestProvider } from "../context/TestContext";

describe("Home component", () => {
  let testState;
  const mockNavigate = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }));

  const renderView = () =>
    render(
      <TestProvider value={testState}>
        <Home />
      </TestProvider>,
      { wrapper: MemoryRouter }
    );

  beforeEach(() => {
    renderView();
  });

  test("renders the logo", () => {
    testState = { test: { done: false } };
    const logo = screen.getByAltText("Blinklearning logo");
    expect(logo).toBeInTheDocument();
  });

  test('renders the "Realizar prueba" button', () => {
    testState = { test: { done: false } };

    const button = screen.getByRole("link", { name: /Realizar prueba/i });
    expect(button).toBeInTheDocument();
  });

  test('renders the "Ver resultados" button', () => {
    const button = screen.getByRole("link", { name: /Ver resultados/i });
    expect(button).toBeInTheDocument();
  });

  test('disables the "Realizar prueba" button when test.done is true', () => {
    testState = { test: { done: true } };
    const button = screen.getByRole("link", { name: /Realizar prueba/i });
    fireEvent.click(button);
    expect(mockNavigate).not.toHaveBeenCalledWith("/test");
  });

  test('disables the "Ver resultados" button when test.done is false', () => {
    testState = { test: { done: false } };
    const button = screen.getByRole("link", { name: /Ver resultados/i });
    fireEvent.click(button);
    expect(mockNavigate).not.toHaveBeenCalledWith("/results");
  });
});

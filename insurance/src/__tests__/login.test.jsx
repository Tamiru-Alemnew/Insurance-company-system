import LoginForm from "../components/Login/Login";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoginPage from "../app/login/page";

jest.mock("../components/Login/Login", () => () => <div data-testid="login" />);

describe("login", () => {
  it("renders the Header component", () => {
    render(<LoginPage />);

    const loginComponent = screen.getByTestId("login");

    expect(loginComponent).toBeInTheDocument();
  });
});

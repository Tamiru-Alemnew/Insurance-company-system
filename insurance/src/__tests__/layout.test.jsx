import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Layout from "../app/layout";
import Header from "../components/Header/Header";

jest.mock("../components/Header/Header", () => () => (
  <header data-testid="Header" />
));

describe("Layout", () => {
  it("renders the Header component", () => {
    render(<Layout />);

    const HeaderComponent = screen.getByTestId("Header");

    expect(HeaderComponent).toBeInTheDocument();
  });
});

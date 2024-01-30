import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Layout from "../app/layout";

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

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import Home from "../components/Home/Home";

jest.mock("../components/Home/Home", () => () => <div data-testid="home" />);

describe("Page", () => {
 it("renders the Home component", () => {
   render(<Page />);

   const homeComponent = screen.getByTestId("home");

   expect(homeComponent).toBeInTheDocument();
 });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Register from "../app/Register/page";

jest.mock("../components/Registration/Registration", () => () => (
  <div data-testid="register" />
));

describe("Register", () => {
    it("renders the Register component", () => {
        render(<Register />);
    
        const registerComponent = screen.getByTestId("register");
    
        expect(registerComponent).toBeInTheDocument();
    });
    }
);

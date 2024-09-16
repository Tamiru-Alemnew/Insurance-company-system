import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Contact from "../app/contact/page";

jest.mock("../components/Contact/Contact", () => () => <div data-testid="contact" />);

describe("Contact", () => {
    it("renders the Contact component", () => {
        render(<Contact />);
    
        const contactComponent = screen.getByTestId("contact");
    
        expect(contactComponent).toBeInTheDocument();
    });
    });     



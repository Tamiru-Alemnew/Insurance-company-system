import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Claim from "../app/portal/claim/page";

jest.mock("../components/FileClaim/FileClaim", () => () => (
  <div data-testid="claim" />
));

describe("Claim", () => {

    it("renders the Claim component", () => {
        render(<Claim />);
    
        const claimComponent = screen.getByTestId("claim");
    
        expect(claimComponent).toBeInTheDocument();
    });
    }
);
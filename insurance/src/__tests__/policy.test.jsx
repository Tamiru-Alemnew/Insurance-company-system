import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Policy from "../app/portal/policy/page";

jest.mock("../components/MyPolicies/Policies", () => () => <div data-testid="policy" />);

describe("Policy", () => {
    it("renders the Policy component", () => {
        render(<Policy />);
    
        const policyComponent = screen.getByTestId("policy");
    
        expect(policyComponent).toBeInTheDocument();
    });
    }
);
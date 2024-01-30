import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pay from "../app/portal/pay/page";

jest.mock("../components/Payments/Payment", () => () => (
  <div data-testid="pay" />
));

describe("Pay", () => {
    it("renders the Pay component", () => {
        render(<Pay />);
    
        const payComponent = screen.getByTestId("pay");
    
        expect(payComponent).toBeInTheDocument();
    });
    }
);
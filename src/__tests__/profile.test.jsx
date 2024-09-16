import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Profile from "../app/portal/profile/page";

jest.mock("../components/Profile/Profile", () => () => <div data-testid="profile" />);

describe("Profile", () => {
    it("renders the Profile component", () => {
        render(<Profile />);
    
        const profileComponent = screen.getByTestId("profile");
    
        expect(profileComponent).toBeInTheDocument();
    });
    }
);
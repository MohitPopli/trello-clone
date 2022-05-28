import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { Login } from ".";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));
describe("Login Tests", () => {
  const renderLogin = () => render(<Login />);

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("should render login page if user not logged in", () => {
    const { getByText } = renderLogin();
    expect(getByText("Login Page")).toBeInTheDocument();
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(0);
  });

  test("should user info from local storage and navigated to dashboard page if user is loggedin", () => {
    localStorage.setItem("userName", "Mohit");
    renderLogin();
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});

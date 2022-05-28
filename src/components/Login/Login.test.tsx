import { fireEvent, render } from "@testing-library/react";
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
    renderLogin();
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(0);
  });

  test("should user info from local storage and navigated to dashboard page if user is loggedin", () => {
    localStorage.setItem("userName", "Mohit");
    renderLogin();
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });

  test("should be able to navigate user after login", () => {
    const { getByTestId } = renderLogin();
    const userNameInput = getByTestId("usernameInput");
    const passwordInput = getByTestId("passwordInput");
    fireEvent.change(userNameInput, { target: { value: "Mohit" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    fireEvent.click(getByTestId("login-btn"));

    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});

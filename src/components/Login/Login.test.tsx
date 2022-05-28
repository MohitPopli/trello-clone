import { render } from "@testing-library/react";
import { Login } from ".";

describe("Login Tests", () => {
  const renderLogin = () => render(<Login />);

  test("should render login page", () => {
    const { getByText } = renderLogin();
    expect(getByText("Login Page")).toBeInTheDocument();
  });
});

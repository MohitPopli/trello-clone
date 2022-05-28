export const getUserName = () => localStorage.getItem("userName");

export const setUserName = (userName: string) =>
  localStorage.setItem("userName", userName);

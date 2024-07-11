export const getToken = () => {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};
export const setToken = (token) => {
  localStorage.setItem("token", token);
};
export const getUser = () => {
  return typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

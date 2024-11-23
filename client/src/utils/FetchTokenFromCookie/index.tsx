export const getTokenFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) =>
    cookie.startsWith("access_token=")
  );
  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  }
  return null;
};

import Cookies from "js-cookie";

const accessToken = "Authorization";
const refreshToken = "RefreshToken";

export function clearCookie() {
  Cookies.remove(accessToken);
  Cookies.remove(refreshToken);
}

export function getToken() {
  return Cookies.get(refreshToken);
}

export function setRouterAccess(data) {
  return localStorage.setItem('routerAccess', JSON.stringify(data))
}

export function setAcountInfo(data) {
  return localStorage.setItem('user', JSON.stringify(data))
}
export function getAcountInfo() {
  return JSON.parse(localStorage.getItem('user'))
}

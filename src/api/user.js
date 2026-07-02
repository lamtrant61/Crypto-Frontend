import request from "@/utils/request";
const uri = process.env.VUE_APP_BASE_API + "auth";

function login(data) {
  return request({
    url: `${uri}/login`,
    method: "post",
    data: data,
  });
}
function logout() {
  return request({
    url: `${uri}/logout`,
    method: "get",
  });
}
function register(data) {
  return request({
    url: `${uri}/register`,
    method: "post",
    data: data,
  });
}
function user_info() {
  return request({
    url: `${uri}/user_info`,
    method: "get",
  });
}

export default {
  login,
  logout,
  register,
  user_info,
};

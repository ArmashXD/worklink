import request from '../request'
import { BASE_URL, BASE_API } from '../Constant'


const baseUrl = `${BASE_URL}`;
const baseApi = `${BASE_API}`;


function register(data) {
  return request({
    url: `${baseApi}register`,
    data,
    method: 'POST'
  });
}

function login(data) {
  return request({
    url: `${baseApi}login`,
    data,
    method: 'POST',
  });
}

function loginWithSocial(token)
{
  return request({ 
  url: `${baseApi}login?token=${token}`,
  method:'POST'
  });
}

function verify(id, data) {
  return request({
    url: `${baseApi}verify/${id}`,
    data,
    method: 'POST',
  });
}

function resendOTP(userId, otpID) {
  return request({
    url: `${baseApi}resend/otp/${userId}/${otpID}`,
    method: 'POST',
  });
}

function logout(data = {}) {
  return request({
    url: `${baseUrl}logout`,
    data,
    method: 'POST',
  });
}

function registerSms(data) {
  return request({
    url: `${baseApi}register-sms`,
    data,
    method: 'POST'
  });
}

function verifySms(id) {
  return request({
    url: `${baseApi}verify/${id}`,
    data,
    method: 'POST',
  });
}

function forgetpassword(data) {
  return request({
    url: `${baseApi}password/create`,
    data,
    method: 'POST',
  });
}

function resetPassword(data) {
  return request({
    url: `${baseApi}password/reset`,
    data,
    method: 'POST',
  });
}
const AuthService = {
  register, login, verify, logout, registerSms, resendOTP, forgetpassword,resetPassword, loginWithSocial
};

export default AuthService


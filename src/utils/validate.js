/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isVietNamPhone = (phone) => {
  const reg = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
  return reg.test(phone)
}

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

export const validateText = (rule, value, callback, name, min = 0, max = 0) => {
  if (isEmpty(value)) {
    callback(new Error(`${name} không được để trống`))
  } else if (
    (value.length < min || value.length > max) &&
    !(min === 0 && max === 0)
  ) {
    callback(new Error(`${name} phải có độ dài từ ${min} đến ${max} ký tự`))
  } else callback()
}

export const validateEmail = (rule, value, callback, name, min = 0, max = 0) => {
  if (isEmpty(value)) {
    callback(new Error(`${name} không được để trống`))
  } else if (!validEmail(value)) {
    callback(new Error(`${name} không hợp lệ`))
  } else callback()
}

export const validateConfirmPassword = (rule, value, callback, name, min = 0, max = 0) => {
  if (isEmpty(value)) {
    callback(new Error(`${name} không được để trống`))
  } else if (value.password !== value.confirm_password) {
    callback(new Error(`${name} không trùng khớp`))
  } else callback()
}

export const validatePhoneNumber = (
  rule,
  value,
  callback,
  name,
  min = 0,
  max = 0
) => {
  if (isEmpty(value)) {
    callback(new Error(`${name} không được để trống`))
  } else if (
    (value.length < min || value.length > max) &&
    !(min === 0 && max === 0)
  ) {
    callback(new Error(`${name} phải có độ dài từ ${min} đến ${max} ký tự`))
  } else if (!isVietNamPhone(value)) {
    callback(new Error(`${name} không đúng định dạng`))
  } else callback()
}
export const validateNumber = (
  rule,
  value,
  callback,
  name,
  min = 0,
  max = 0
) => {
  if (isEmpty(value)) {
    callback(new Error(`${name} không được để trống`))
  } else if (
    (value.length < min || value.length > max) &&
    !(min === 0 && max === 0)
  ) {
    callback(new Error(`${name} phải có độ dài từ ${min} đến ${max} ký tự`))
  } else callback()
}
export const validateDate = (rule, value, callback, name) => {
  if (!value) {
    callback(new Error(`${name} không được để trống`))
  } else callback()
}

export const validateArray = (rule, value, callback, name) => {
  if (isEmpty(value)) {
    callback(new Error(`${name} không được để trống`))
  } else if (!Array.isArray(value)) {
    callback(new Error(`${name} không đúng định dạng`))
  } else callback()
}

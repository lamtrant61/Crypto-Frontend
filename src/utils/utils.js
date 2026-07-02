function formatName(name = '') {
  const str = name.trim().length < 10 ? name : name.slice(0, 10) + '...'
  return str
}

function formatObjectToParams(query) {
  const keys = Object.keys(query)
  const list = []
  for (const key of keys) {
    if (query[key] !== undefined) {
      if (typeof query[key] === 'object') {
        list.push(`${key}=${JSON.stringify(query[key])}`)
      } else {
        list.push(`${key}=${query[key]}`)
      }
    }
  }
  return list.join('&')
}

function formatNameCategory(name = '') {
  if (!name.length) return ''
  const chat = name.charAt(0)
  const subStr = name.slice(1, name.length)
  return `${chat.toLocaleUpperCase()}${subStr.toLocaleLowerCase()}`
}

function format_number(number = 0) {
  return number >= 10 ? number.toString() : '0' + number
}

function format_clock(time = 0) {
  const minnutes = parseInt(time / 60)
  const second = time % 60
  return `${format_number(minnutes)}:${format_number(second)}`
}

function paserJson(json = null) {
  try {
    if (!json) return null
    return JSON.parse(json)
  } catch (error) {
    return null
  }
}

module.exports = {
  paserJson,
  formatName,
  formatObjectToParams,
  formatNameCategory,
  format_clock
}

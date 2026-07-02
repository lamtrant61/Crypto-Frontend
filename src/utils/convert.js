export function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

export function formatNumber(value) {
  const val = (value / 1).toFixed().replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function convertDateString(inputFormat, from = 'dd/mm/yyyy', to = 'yyyy-mm-dd') {
  if (from === 'dd/mm/yyyy' && to === 'yyyy-mm-dd') {
    const d = inputFormat.split('/')
    const dateString = `${d[2]}-${d[1]}-${d[0]}`
    return dateString
  }
}

export function convertMilliSecondsToDateFormat(milli, format = 'DD/MM/YYYY') {
  const date = new Date(milli) // Date 2011-05-09T06:08:45.178Z
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  if (format === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`
  } else if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`
  }
}

export function convertDBDateTime(input) {
  const dt = input.split(' ')
  let dateTime = dt[0].substr(0, 10).split('-')
  dateTime = dateTime[2] + '-' + dateTime[1] + '-' + dateTime[0]
  const result = dt[1] + ' ' + dateTime
  return result
}

export function convertDate(inputFormat, format = 'DD/MM/YYYY') {
  function pad(s) {
    return (s < 10) ? '0' + s : s
  }
  const d = new Date(inputFormat)
  if (format === 'DD/MM/YYYY') {
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  } else if (format === 'YYYY-MM-DD') {
    return [pad(d.getFullYear()), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }
}

// export function convertDateTime(inputFormat, format = 'DD/MM/YYYY HH:ss ') {
//   const moment = require('moment');
//   const data = moment(inputFormat).format(format);
//   return data;
// }
export function convertDateTime(inputFormat, format = 'DD/MM/YYYY') {
  function pad(s) {
    return (s < 10) ? '0' + s : s
  }
  const d = new Date(inputFormat)
  const time = [pad(d.getHours()), pad(d.getMinutes())].join(':')
  let day = ''
  if (format === 'DD/MM/YYYY') {
    day = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  } else if (format === 'YYYY-MM-DD') {
    day = [pad(d.getFullYear()), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }
  return `${time} ${day}`
}

export function convertDateTimeSecond(inputFormat, format = 'DD/MM/YYYY') {
  function pad(s) {
    return (s < 10) ? '0' + s : s
  }
  const d = new Date(inputFormat)
  const time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':')
  let day = ''
  if (format === 'DD/MM/YYYY') {
    day = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  } else if (format === 'YYYY-MM-DD') {
    day = [pad(d.getFullYear()), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }
  return `${time} ${day}`
}

export function convertDateTimeString(inputFormat, format = 'YYYY-MM-DD') {
  function pad(s) {
    return (s < 10) ? '0' + s : s
  }
  const d = new Date(inputFormat)
  const time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':')
  let day = ''
  if (format === 'DD/MM/YYYY') {
    day = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  } else if (format === 'YYYY-MM-DD') {
    day = [pad(d.getFullYear()), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }
  return `${day} ${time}`
}

export function renderStringDate(s) {
  return (s < 10) ? '0' + s : s
}

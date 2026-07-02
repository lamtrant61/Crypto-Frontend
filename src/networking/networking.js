import config from './network_config'

export function uploadAPI(fileByte) {
  const form = new FormData()
  form.append('image', fileByte)
  return new Promise((resolve, reject) => {
    try {
      fetch(`${config.url}/api/public/post`, { method: 'POST', body: form })
        .then((response) => {
          return response.json()
        })
        .then((jsonData) => {
          resolve(Object.assign({}, jsonData))
        })
    } catch (err) {
      console.error('Caught an error during login:', err)
      reject(err)
    }
  })
}

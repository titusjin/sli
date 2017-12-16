import axios from 'axios'

exports.fire = (options) => {
  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

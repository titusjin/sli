import axios from 'axios'
import swal from 'sweetalert'

exports.fire = (options) => {
  return new Promise((resolve, reject) => {
    // Remove below line for now after FE changed to adopt this kind of API :
    // like api.fire({url : xxxx, method: cdcdacas})
    // if(!options.headers) options.headers = {'Accept-Language': 'en'};

    axios
      .request(options)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        if (err.status === 401) {
          swal({
            title: 'Error!',
            text: 'Looks like your token expired, please login again',
            type: 'warning',
            html: true,
            showCancelButton: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Sure',
            closeOnConfirm: false
          }, function (isConfirm) {
            if (isConfirm) {
              localStorage.clear()
              if (!location.origin) {
                location.origin = `${location.protocol}//${location.host}`
              }
              window.location.replace(location.origin)
            }
          })
        } else {
          reject(err)
        }
      })
  })
}

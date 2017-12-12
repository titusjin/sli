/**
 *  wrapper fot react-swal for our project usage to aboid code seperated across
 *  whole project.
 *
 *  @since 2017.04.01
 *  @author titus@deepblu.com
 */

'use strict'
import SweetAlert from 'react-swal'

let swalTrigger = {}
swalTrigger.triggerGeneralAlert = (type, message) => {
  switch (type) {
    case 'pass':
      swal({title: 'Cheers!', text: 'Job Done.', type: 'success', allowOutsideClick: true, allowEscapeKey: true })
      break
    case 'fail':
      swal({title: 'Uh-oh!', text: message, type: 'error', allowOutsideClick: true, allowEscapeKey: true })
      break
    default:
      break
  }
}

swalTrigger.triggerCustomSwal = (config) => {
  swal(config)
}

export default swalTrigger

import swalTrigger from './swalTrigger'

export const filterSelectedUsers = (userArr, status) => {
  if (!status) {
    swalTrigger.triggerCustomSwal({
      title: 'whoopsy!',
      text: 'No Status Selected',
      type: 'error',
      allowOutsideClick: true,
      allowEscapeKey: true
    })
    return
  }
  if (userArr.length === 0) {
    swalTrigger.triggerCustomSwal({
      title: 'Woopsy',
      text: 'No Resellers Were Selected',
      type: 'error',
      allowEscapeKey: true,
      allowOutsideClick: true
    })
    return
  }

  userArr = userArr.filter(user => user.isSelected).map(user => user.ownerId)

  return userArr
}

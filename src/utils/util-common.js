'use strict'

exports.unpack = function (rows, key) {
  return rows.map(function (row) {
    return row[key]
  })
}

exports.transToLineChartDataFormat = function (data, x, y) {
  return data.map(function (row) {
    row.x = row[x]
    row.y = row[y]
    delete row[x]
    delete row[y]
    return row
  })
}

exports.capitalizeString = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

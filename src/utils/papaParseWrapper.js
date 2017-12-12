import Papa from 'papaparse'
const Promise = require('bluebird')

class PapaParserWrapper {
  constructor () {};

  parseByStreaming (file, completeCallback, errorCallback) {
    let rows = []
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      step: function (row) {
        rows.push(row.data)
        	},
        	complete: function () {
        		console.log('All done!', rows)
          completeCallback(rows)
        	},
      error: (err) => {
        errorCallback(err)
      }
    })
  }
}

module.exports = PapaParserWrapper


'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./webpack-atomizer-plugin.cjs.production.min.js')
} else {
  module.exports = require('./webpack-atomizer-plugin.cjs.development.js')
}

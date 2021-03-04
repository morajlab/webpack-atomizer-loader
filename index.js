
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/webpack-atomizer-plugin.cjs.production.min.js')
} else {
  module.exports = require('./dist/webpack-atomizer-plugin.cjs.development.js')
}

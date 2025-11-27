'use strict'

const util = require('util')

module.exports = function (context) {
    // stringify everything in context for inspection
    return util.inspect(context, { depth: null })
}

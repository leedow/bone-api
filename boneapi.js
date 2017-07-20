(function() {
  if(typeof require != 'undefined'){
    reqwest = require('./reqwest')
  }

  var boneapi = {
    base: '',
    error: function() {},
    filterData: function(d){return d},
    filterConfig: function(c){return c},
    route: function() {return true},
    config: function(config){
        for(var key in config){
          this[key] = config[key]
        }
    },
    post: function(url, data, config) {
      return new rqt(url, data, 'post', config)._error(this.error)
    },
    get: function(url, data, config) {
      return new rqt(url, data, 'get', config)._error(this.error)
    },
    delete: function(url, data, config) {
      return new rqt(url, data, 'delete', config)._error(this.error)
    },
    put: function(url, data, config) {
      return new rqt(url, data, 'put', config)._error(this.error)
    }
  }

  function rqt(url, data, method, config) {
    this.url = boneapi.base + url
    this.data = data || {}
    this.method = method || 'get'
    this._config = {}

    this.successCallback = function() {}
    this.errorCallback = function() {return true}
    this._errorCallback = function() {}
    const that = this

    this.success = function(callback) {
      this.successCallback = callback
      return this
    }

    this.error = function(callback) {
      this.errorCallback = callback
      return this
    }

    this._error = function(callback) {
      this._errorCallback = callback
      return this
    }

    var params = {
      url: that.url,
      method: that.method,
      data: boneapi.filterData(data),
      success: function(res, x) {
        if (boneapi.route(res, x)) {
          that.successCallback(res, x)
        } else {
          var r = that.errorCallback(res, x)
          if (r) {
            that._errorCallback(res, x)
          }
        }
      },
      error: function(res) {
        var r = that.errorCallback(res)
        if (r) {
          that._errorCallback(res)
        }
      }
    }

    for(var key in config){
      params[key] = config[key]
    }

    reqwest(boneapi.filterConfig(params))
  }

  if (typeof module != 'undefined') {
    module.exports = boneapi
  } else {
    window.boneapi = boneapi
  }
})()

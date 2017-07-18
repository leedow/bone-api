(function() {
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

    this.successCallback = function() {} //eslint-disable-line
    this.errorCallback = function() {return true} //eslint-disable-line
    this._errorCallback = function() {} //eslint-disable-line
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

    this.config = function(config){
      this._config = config
    }




    var params = {
      url: that.url,
      method: that.method,
      data: boneapi.filterData(data),
      success: function(res) { //eslint-disable-line
        if (boneapi.route(res)) {
          that.successCallback(res)
        } else {
          var r = that.errorCallback(res)
          if (r) {
            that._errorCallback(res)
          }
        }
      },
      error: function(res) { //eslint-disable-line
        var r = that.errorCallback(res)
        if (r) {
          that._errorCallback(res)
        }
      }
    }



    /*
    if (type == 'json') {
      params.contentType = 'application/json; charset=utf-8'
      params.type = 'post'
      params.data = JSON.stringify(data)
    }
    if (bonestore.get('token')) {
      params.beforeSend = function(xhr) {
        var token = bonestore.get('token')
        xhr.setRequestHeader("Auth-Token", token);
      }
    }*/

    reqwest(boneapi.filterConfig(params))
  }



  if (typeof module != 'undefined') {
    module.exports = boneapi
  } else {
    window.boneapi = boneapi
  }
})()

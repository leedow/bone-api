# Bone-api

Ajax tool designed for large project
It requset through the dependency [Reqwest](https://github.com/ded/reqwest) （with small modification）


## Install

```
npm install bone-api --save
```
or
```javascript
<script type="text/javascript" src="./boneapi.min.js"></script>
```


## Global config
It helps you prevent from repeating the same thing when requesting.

```javascript
boneapi.config({
  // set the base url
  base: '',
  // filter data before send
  filterData: function(data, config){
    data.config = 'param from filter'
    return data
  },
  // filter ajax config before send
  filterConfig: function(config){
    if(config.method == 'delete')
      config.method = 'get'
    return config
  },
  // by default successs function would be invoked when request return status 200
  // you can change the rule here
  route: function(res){
    if(res.code == 0){
      // call success function when return true
      return true
    } else {
      // call error function when return false
      return false
    }
  },
  // global error handler
  error: function(){
    log('Global error')
  }
})
```

## Examples
### Base usage
```javascript
boneapi.get('/testapi', {
  params: 'value'
}).success(function(res, xhr){

})
```

### More
```javascript
// support get|post|put|delete
// boneapi.base will be ignored here
boneapi.post('http://www.google.com', {
  params: 'value'
}, {
  // private config here
  headers: {
    test: 'value'
  }
}).success(function(res, xhr){
  // get response header attribute
  console.log(xhr.getResponseHeader('header-attribute'))
}).error(function(res){
  // you don't want to invoke global error callback just return false
  return false
}).always(function(){
  // always be invoked
})
```

### Authorization
You can do it globally
```javascript
boneapi.config({
  filterConfig: function(config){
    if(config.headers){
      config.headers.auth = 'your token here'
    } else {
      config.headers ={
        auth: 'your token here'
      }
    }
    return config
  }
})
```
or
```javascript
boneapi.delete('/testapi', {
  params: 'value'
}, {
  // add token to request header
  headers: {
    auth: 'token'
  }
}).success(function(res, xhr){

})
```

### Send JSON with payload
Data will be parsed
```javascript
boneapi.post('/testapi', {
  params: 'value'
}, {
  contentType: 'application/json; charset=utf-8'
}).success(function(res, xhr){

})
```

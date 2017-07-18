# Bone-api

## Install

```
npm install bone-api --save
```

## Quik start
```
<script type="text/javascript" src="./boneapi.min.js"></script>
```
or
```
import boneapi from 'bone-api'
```

## Example
```
boneapi.config({
  base: '',
  filterData: function(data, config){
    data.config = 'param from filter'
    return data
  },
  filterConfig: function(config){
    if(config.method == 'delete')
      config.method = 'get'
    return config
  },
  route: function(res){
    if(res.code == 0){
      log('Global route callback: invoke success function')
      // call success function when return true
      return true
    } else {
      log('Global route callback: invoke error function')
      // call error function when return false
      return false
    }
  },
  error: function(){
    log('Glocal error')
  }
})

// support get post put delete
boneapi.get(url, {
  test: 1
}).success(function(res){

}).error(function(res){

})
```

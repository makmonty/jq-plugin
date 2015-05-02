jEngine: jq-plugin
==================
[![Bower version](https://badge.fury.io/bo/jq-plugin.svg)](http://badge.fury.io/bo/jq-plugin)
[![npm version](https://badge.fury.io/js/jq-plugin.svg)](http://badge.fury.io/js/jq-plugin)
[![Build Status](https://travis-ci.org/jstools/jq-plugin.svg?branch=master)](https://travis-ci.org/jstools/jq-plugin)

Installation
------------
```.sh
npm install jq-plugin --save
```
  or
```.sh
bower install jq-plugin --save
```

Usage
-----

``` html
<button>Hola</button>
```

``` js
// $.plugin(selector, handler, isCollection?)
$.plugin('button', function () {
  var jBtn = $(this);

  jBtn.click(function () {
    alert(jBtn.text());
  });
});
```

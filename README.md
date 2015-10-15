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

Demo
----
http://plnkr.co/edit/NSaBssbFXBjDcIRljy92?p=preview

http://codepen.io/jgermade/pen/YyrRGL?editors=101

Usage
-----

> $.plugin

``` html
<button class="click">Click Me</button>
```

``` js
$.plugin('button.click', function () {
  var jBtn = $(this),
      alt = false;

  jBtn.click(function () {
    alt = !alt;
    if( alt ) {
      jBtn.text('it works!');
    } else {
      jBtn.text('Click Me');
    }

  });
});
```

> $.widget

``` html
<div data-widget="test">
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>
```

``` js
$.widget('test', function () {
  console.log('widget', this);

  $(this).find('li').hover(function() {
      this.style.fontWeight = 'bold';
    }, function() {
      this.style.fontWeight = 'normal';
    });
});
```

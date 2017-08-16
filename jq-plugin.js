/*
 * jq-plugin
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Jesús Manuel Germade Castiñeiras <jesus@germade.es>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */


(function (root) {

  if( !root.$ ) {
    return;
  }

  var jq = root.$,
      jDoc = jq(document),
      pluginCache = {},
      pluginsAre = {},
      pluginsFilterCache = {};

  function filter (list, iteratee) {
    var result = [], n = 0;

    for( var i = 0, len = list.length; i < len ; i++ ) {
      if( iteratee(list[i]) ) {
        result[n++] = list[i];
      }
    }

    return jq(result);
  }

  function pluginSelectorFilter (pluginSelector) {
    if( !pluginsFilterCache[pluginSelector] ) {
      pluginsFilterCache[pluginSelector] = function (el) {
        el.$$plugins = el.$$plugins || {};
        if( !el.$$plugins[pluginSelector] ) {
          el.$$plugins[pluginSelector] = true;
          return true;
        }
      };
    }
    return pluginsFilterCache[pluginSelector];
  }

  function runPlugin (target, pluginSelector) {
    var handler = pluginCache[pluginSelector],
        elements = filter( jq(pluginSelector), pluginSelectorFilter(pluginSelector) );

    if( handler && elements.length ) {
      if( handler._collection ) {
        handler( elements );
      } else {
        elements.each(handler);
      }
    }
  }

  function initPlugin () {
    pluginsAre.loading = true;
    jq(function () {
      for( var pluginSelector in pluginCache ) {
        runPlugin(document, pluginSelector);
      }

      jq(document.body).on('DOMSubtreeModified', function (event) {
        for( var pluginSelector in pluginCache ) {
          runPlugin(event.target, pluginSelector);
        }
      });

      delete pluginsAre.loading;
      pluginsAre.running = true;
    });
  }

  jq.plugin = function (selector, handler, collection) {
    if( typeof selector !== 'string' || !(handler instanceof Function) ) {
      throw new Error('required selector (string) and handler (function)');
      return;
    }

    pluginCache[selector] = handler;
    pluginCache[selector]._collection = !!collection;

    if( pluginsAre.loading ) {
      return;
    }

    if( pluginsAre.running ) {
      runPlugin(document, selector);
    } else {
      initPlugin();
    }
  };

  // widgets

  var widgets = {},
      widgetsAre = {};

  function missingWidget () {
    if( this.$$plugins && this.$$plugins['[data-widget]'] ) {
      delete this.$$plugins['[data-widget]'];
    }
  }

  function initWidget () {
    widgetsAre.loading = true;
    jq(function () {
      jq.plugin('[data-widget]', function () {
        ( widgets[this.getAttribute('data-widget')] || missingWidget ).call(this);
      });
      delete widgetsAre.loading;
      widgetsAre.running = true;
    });
  };

  jq.widget = function (widgetName, handler) {
    if( typeof widgetName === 'string' && handler instanceof Function ) {

      widgets[widgetName] = handler;

      if( widgetsAre.loading ) {
        return;
      }

      if( widgetsAre.running ) {
        jq('[data-widget="' + widgetName + '"]').each(handler);
      } else {
        initWidget();
      }
    }
  };

})(window);
